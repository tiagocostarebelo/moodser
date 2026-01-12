export function generatedId(): string {
    if (typeof crypto !== "undefined" && "randomUUID" in crypto) {
        return crypto.randomUUID();
    }

    // fallback: reasonably unique for frontend-only MVP
    return `id_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
}
