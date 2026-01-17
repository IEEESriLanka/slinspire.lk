import { useState, useEffect } from "react";

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxylGlC8OofZg_DpFeymtV13ddD5LFo1Tn3qvSYYZ1ZaadquDDpXwRduGS7Pw6bV-DZ/exec";L

export function useRegistrationCount() {
    const [count, setCount] = useState(0);
    const [remaining, setRemaining] = useState(200);
    const [isFull, setIsFull] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchCount = async () => {
        try {
            const res = await fetch(GOOGLE_SCRIPT_URL);
            const data = await res.json();
            setCount(data.count || 0);
            setRemaining(data.remaining || 200);
            setIsFull(data.isFull || false);
        } catch (err) {
            console.error("Failed to fetch count");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCount();
        const interval = setInterval(fetchCount, 8000); // Update every 8 seconds
        return () => clearInterval(interval);
    }, []);

    return { count, remaining, isFull, loading, refetch: fetchCount };
}