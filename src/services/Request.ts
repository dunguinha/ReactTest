export class Request{

    async listingCameras(): Promise<Camera> {
        const request = await fetch("http://localhost:5000/cameras", {
            method: "GET",
        });

        const response = await request.json();

        return response;
    }

    async createCamera(title: string | boolean, plan: string | boolean, external: boolean){
        await fetch("http://localhost:5000/cameras", {
            method: "POST",
            body: JSON.stringify({
                title: title,
                plan: plan,
                external: external,
            }),
            headers: {"Content-Type": "application/json"}
        });
    }

    async deleteCamera(id: number) {
        await fetch(`http://localhost:5000/cameras/${id}`, {
            method: "DELETE",
        });
    }

    async updateCamera(title: string | boolean, plan: string | boolean, external: boolean, id: number){
        await fetch(`http://localhost:5000/cameras/${id}`, {
            method: "PUT",
            body: JSON.stringify({
                title: title,
                plan: plan,
                external: external,
            }),
            headers: {"Content-Type": "application/json"}
        });
    }
}