import { File as PrismaFile } from "@prisma/client";
import { useContext } from "react";
import {
  ActionFunction,
  Form,
  Link,
  LoaderFunction,
  redirect,
  unstable_parseMultipartFormData,
  useFetcher,
  useLoaderData,
  useTransition,
} from "remix";
import {
  TextDateTime,
  TextDelete,
  TextManageFiles,
  TextUpload,
} from "~/src/Text";
import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";
import { authenticate } from "~/utils/authenticate";
import { db, s3, uploadHandler } from "~/utils/db.server";
import { invariantString } from "~/utils/utils";
import { LanguageContext } from "~/utils/context/language";
import Space from "~/src/ui/Space";

type FileData = Pick<PrismaFile, "filename" | "mimetype" | "size" | "uploadAt">;
type LoaderData = {
  files: FileData[];
};

export const loader: LoaderFunction<LoaderData> = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const files = await db.file.findMany({
    orderBy: {
      uploadAt: "desc",
    },
    select: {
      filename: true,
      mimetype: true,
      size: true,
      uploadAt: true,
    },
  });

  return { files };
};

enum ActionType {
  Upload = "upload",
  Delete = "delete",
}

export const action: ActionFunction = async ({ request }) => {
  if (!authenticate(request)) {
    return redirect("/admin/login");
  }

  const formData = await unstable_parseMultipartFormData(
    request,
    uploadHandler
  );
  const _action = formData.get("_action");

  switch (_action) {
    case ActionType.Upload: {
      const files = formData
        .getAll("file")
        .filter((f): f is File => f instanceof File);

      await db.file.createMany({
        data: files.map((f) => ({
          filename: f.name,
          mimetype: f.type,
          size: f.size,
        })),
      });

      await Promise.all(files.map((f) => s3.writeFile(f.name, f)));

      return null;
    }
    case ActionType.Delete: {
      const filename = invariantString(formData.get("filename"));

      await Promise.all([
        db.file.delete({
          where: { filename },
        }),
        s3.deleteFile(filename),
      ]);

      return null;
    }
  }

  throw new Response("Invalid action", { status: 400 });
};

function FileRow({ file }: { file: FileData }) {
  const { language } = useContext(LanguageContext);
  const fetcher = useFetcher();
  const isSubmitting = fetcher.state === "submitting";

  return (
    <tr key={file.filename}>
      <td>
        <Link to={`/file/${file.filename}`} target="_blank">
          {file.filename}
        </Link>
      </td>
      <td className="color-pink">{file.mimetype}</td>
      <td className="color-green">
        {new Intl.NumberFormat(language, {
          maximumFractionDigits: 0,
        }).format(file.size)}
      </td>
      <td className="color-grey">
        <TextDateTime time={new Date(file.uploadAt)} />
      </td>
      <td>
        <fetcher.Form method="post">
          <input type="hidden" name="filename" value={file.filename} />
          <button
            type="submit"
            name="_action"
            value={ActionType.Upload}
            disabled={isSubmitting}
          >
            <TextDelete color="red" />
          </button>
        </fetcher.Form>
      </td>
    </tr>
  );
}

export default function FileManage() {
  const { files } = useLoaderData<LoaderData>();
  const { state } = useTransition();
  const isUploading = state === "submitting";

  return (
    <Card header={<CardTitle title={<TextManageFiles />} />}>
      <Space direction="vertical" gap={10}>
        <Form method="post" encType="multipart/form-data">
          <input type="hidden" name="_action" value={ActionType.Upload} />
          <input type="file" name="file" multiple />
          <button type="submit" disabled={isUploading}>
            <TextUpload />
          </button>
        </Form>

        <table>
          <tbody>
            {files.map((file) => (
              <FileRow key={file.filename} file={file} />
            ))}
          </tbody>
        </table>
      </Space>
    </Card>
  );
}

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
