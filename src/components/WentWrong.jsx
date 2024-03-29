
import Link from 'next/link'

const WentWrong = ({ error, status, buttonMessage, buttonURL }) => {
    return (
        <section className="flex items-center h-full p-16 bg-gray-200 dark:bg-gray-900 dark:text-gray-100">
            <div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
                <div className="max-w-md text-center">
                    <h2 className="mb-8 font-extrabold text-9xl dark:text-gray-600">
                        <span className="sr-only">Error</span>{status}
                    </h2>
                    <p className="text-2xl font-semibold md:text-5xl mb-4">{ error }</p>
                    {(status !== '200' && status !== 200 && status !== 'SUCCESS') && <p className="mt-4 mb-4 dark:text-gray-400">Please try again after some time, Remember to comeback...😇</p>}
                    <Link href={buttonURL || '/'} className="px-8 py-3 w-fit font-semibold rounded bg-green-600 text-gray-900">{buttonMessage || 'Back to homepage'}</Link>
                </div>
            </div>
        </section>
    )
}

export default WentWrong