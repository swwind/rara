import {
  ActionFunction,
  Form,
  json,
  LoaderFunction,
  redirect,
  useActionData,
} from "remix";
import { TextAdminLogin, TextSecretWrong, TextSubmit } from "~/src/Text";
import Card from "~/src/ui/Card";
import CardTitle from "~/src/ui/CardTitle";
import { authenticate, isSecret } from "~/utils/authenticate";

export const loader: LoaderFunction = async ({ request }) => {
  if (authenticate(request)) {
    return redirect("/admin/dashboard");
  }

  return null;
};

type ActionData = {
  failed: true;
};

export const action: ActionFunction<ActionData> = async ({ request }) => {
  const form = await request.formData();
  const secret = form.get("secret");

  if (typeof secret === "string" && isSecret(secret)) {
    return redirect("/admin/dashboard", {
      headers: {
        "Set-Cookie": `secret=${secret}; HttpOnly; Path=/; Secure`,
      },
    });
  }

  return json({ failed: true }, { status: 401 });
};

export default function AdminLogin() {
  const actionData = useActionData<ActionData>();

  return (
    <Card header={<CardTitle title={<TextAdminLogin />} />}>
      <Form method="post">
        <div>
          <input type="text" name="secret" placeholder="secret..." />
        </div>
        <div>
          <button type="submit">
            <TextSubmit />
          </button>
          {actionData?.failed && (
            <span style={{ color: "var(--color-red)" }}>
              <TextSecretWrong />
            </span>
          )}
        </div>
      </Form>
    </Card>
  );
}
