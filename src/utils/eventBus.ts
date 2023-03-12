const eventBus = {
    on(event: string, callback: any = null) {
        document.addEventListener(event, (e: any) => callback(e.detail));
    },
    dispatch(event: string, data: any = null) {
        document.dispatchEvent(new CustomEvent(event, { detail: data }));
    },
    remove(event: string, callback: any = null) {
        document.removeEventListener(event, callback);
    },
};

export default eventBus;
