import { LoaderFunction } from "remix";
import { db, s3 } from "~/utils/db.server";

function parseRange(
  range: string,
  filesize: number
): { start: number; end: number } | false {
  if (!range?.startsWith("bytes=")) {
    return false;
  }

  const bytes = range.slice(6);
  const match = /^(\d+)-(\d*)$/.exec(bytes);

  if (!match) {
    return false;
  }

  const start = parseInt(match[1]);
  const end = match[2] ? parseInt(match[2]) : filesize - 1;

  if (start < 0 || (start > end && end >= filesize)) {
    return false;
  }

  return { start, end };
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const filename = params.filename!;

  const file = await db.file.findUnique({
    where: { filename },
    select: {
      filename: true,
      mimetype: true,
      size: true,
      uploadAt: true,
    },
  });

  if (!file) {
    throw new Response("File not found", { status: 404 });
  }

  const headers = new Headers();
  headers.set("Accept-Ranges", "bytes");

  // 返回部分文件
  if (request.headers.has("Range")) {
    const range = request.headers.get("Range")!;
    const result = parseRange(range, file.size);

    // 如果不是有效的 Range，则返回 416
    if (!result) {
      headers.set("Content-Range", `bytes */${file.size}`);
      throw new Response("Invalid range", { status: 416, headers });
    }

    // 返回部分文件
    const { start, end } = result;
    headers.set("Content-Type", file.mimetype);
    headers.set("Content-Range", `bytes ${start}-${end}/${file.size}`);

    return new Response(
      await s3.readFilePartial(file.filename, start, end - start + 1),
      {
        status: 206,
        headers,
      }
    );
  }

  // 返回整体文件
  else {
    headers.set("Content-Type", file.mimetype);
    headers.set("Cache-Control", "public, max-age=31536000");
    headers.set("Content-Disposition", "inline");

    return new Response(await s3.readFile(file.filename), {
      status: 200,
      headers,
    });
  }
};

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
