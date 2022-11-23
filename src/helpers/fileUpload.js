

export const fileUpload= async(file) => {
    if(!file) throw new Error('file is required');
    const cloudUrl = 'https://api.cloudinary.com/v1_1/dosaxkwcj/upload';

    const formData = new FormData();

    formData.append('upload_preset','react-projects');
    formData.append('file',file);

    try {
        const resp = await fetch(cloudUrl,{
            method:'POST',
            body:formData
        });
        console.log(resp)

        if(resp.ok){
            const cloudResp = await resp.json();
            return cloudResp.secure_url;
        }else{
            throw await resp.json();
        }
    } catch (error) {
        throw error;
    }
}
