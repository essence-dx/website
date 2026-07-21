import * as React from "react";
export function useDelayedStatus(status, delay) {
    const [delayedStatus, setDelayedStatus] = React.useState(status);
    React.useEffect(() => {
        const timeout = window.setTimeout(() => {
            setDelayedStatus(status);
        }, status === "submitted" ? delay : 0);
        return () => window.clearTimeout(timeout);
    }, [delay, status]);
    return delayedStatus;
}
