export default function Loader() {
    return (
        <div className="flex space-x-2 mt-1 mr-2 py-2">
            <span className="w-2 h-2 rounded-full bg-blue-200 animate-dot-loading delay-0"></span>
            <span className="w-2 h-2 rounded-full bg-blue-200 animate-dot-loading delay-200"></span>
            <span className="w-2 h-2 rounded-full bg-blue-200 animate-dot-loading delay-400"></span>
        </div>
    );
}
