"use client"
export default function ThankYouPage() {
    return (
        <div className="flex items-center justify-center py-[50px] bg-gray-100 px-4">
            <div className="bg-white p-8 rounded-2xl shadow-md max-w-md w-full text-center">
                <div className="text-green-600 text-6xl mb-4">✓</div>
                <h1 className="text-2xl font-bold text-gray-800 mb-2">Thank You for Registering!</h1>
                <p className="text-gray-600 mb-6">
                    Your registration was successful. We’re excited to have you on board!
                </p>
                <p className="mb-[10px] text-gray-600">You are 1 Step Far </p>
                <a
                    href="/register"
                    className="inline-block bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition"
                >
                    Go To Login Page
                </a>
            </div>
        </div>
    );
}
