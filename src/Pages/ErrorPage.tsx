import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";

export default function ErrorPage() {
    const error: unknown = useRouteError();
    console.error(error);

    return (
        <div className="text-center pt-24 leading-10">
            <h1 className="text-4xl font-bold">Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p className="font-light">
                <i>
                    {(error as Error)?.message ||
                        (error as { statusText?: string })?.statusText}
                </i>
            </p>

            <Link
                to="/"
                className="py-2 px-4 rounded-md bg-violet-600 text-violet-50 hover:bg-violet-600 active:bg-violet-800"
            >
                Return Home
            </Link>
        </div>
    );
}
