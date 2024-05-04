
import conf from '../conf/conf'
import {Client,ID ,Database ,Storage,Query} from "appwrite"


export class Service{
    client = new Client();
    database;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId);
        this.database = new Database(this.client);
        this.bucket = new Storage(this.client);

    }
    async createPost({title,slug, content, featuredImage, status,userId}){
        try{
            return await this.database.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    tittle,
                    content,
                    featuredImage,
                    status,
                    userId,
                }

            )
        }catch(error){
            console.log("Appwrite service :: createPost :: error",error);
        }
    }
    async updatePost(slug,{title, content, featuredImage, status,userId}){
try{
    return await this.database.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        slug,
        {
           title,
           content,
           featuredImage,
           status, 
        }
    )

}catch(error){
    console.log("Appwrite serive :: updataPost :: error", error);
}
    }

    async deletePost(slug){
        try{
            await this.database.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,

            )
            return true

        }catch(error){
            console.log("appwrite service :: deletePost :: error", error);
            return false;
        }
    }

    async getPost(slug){
        try{
            return await this.database.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
            )


        }
        catch(error){
            throw(error);
            return false
        }
    }

    async  getPosts(Queries = [Query.equal("status","active")]){
        try{
            return  await  this.database.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteDatabaseId,
                Queries,
                100,
                0,
            )
            
        }catch(error){
            throw(error);
            return false;


        }

    }

    async uploadFile(file){
        try{
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                Id.unique(),
                file,
            )

        }catch(error){
            throw(error);
            return false
        }

    }

    async deleteFile(fileId){
        try{
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId,
            )
            return true;

        }catch(error){
            throw(error);
            return false;
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    
}

const service = new Service();

export  default service