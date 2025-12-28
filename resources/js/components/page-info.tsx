

interface PageInfoProps {
    title: string;
    description: string;
}

export default function PageInfo({ title, description }: PageInfoProps) {
    return (
        <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
                {title}
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {description}
            </p>
        </div>
    );
}
