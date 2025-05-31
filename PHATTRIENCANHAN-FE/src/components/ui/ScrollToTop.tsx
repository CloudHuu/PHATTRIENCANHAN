const ScrollToTop = () => {
    return (
        <>
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="fixed bottom-4 right-4 z-50 p-2 bg-blue-500 text-white rounded-full shadow-lg hover:bg-blue-600 transition-colors"
                aria-label="Scroll to top"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7-7-7 7m0 6l7 7 7-7" />
                </svg>
            </button>
        </>
    );
};

export default ScrollToTop;