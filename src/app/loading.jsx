"use client"
import React from 'react'

export default function Loading() {
    return (
        <div className="flex items-center justify-center min-h-[100px]">
            <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
    );
}
