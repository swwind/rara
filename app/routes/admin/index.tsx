import { LoaderFunction, redirect } from "remix";

export const loader: LoaderFunction = () => {
  return redirect("/admin/dashboard");
};

export { ErrorBoundary, CatchBoundary } from "~/src/Boundary";
