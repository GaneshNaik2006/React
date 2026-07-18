import conf from '../conf/conf.js';
import { Client, ID, TablesDB, Storage, Query } from 'appwrite';

export class Service {
    client = new Client();
    databases;
    bucket;
    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new TablesDB(this.client);
        this.bucket = new Storage(this.client);
    }
    async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
        const row = await this.databases.createRow(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
                userId,
            }
        );

        console.log("Created Row:", row);

        return row;
    } catch (error) {
        console.log("Appwrite create post error:", error);
        return null;
    }
}
    async updatePost(slug, { title, content, featuredImage, status }) {
    try {
        const row = await this.databases.updateRow(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            slug,
            {
                title,
                content,
                featuredImage,
                status,
            }
        );

        console.log("Updated Row:", row);

        return row;
    } catch (error) {
        console.log("Appwrite update post error:", error);
        return null;
    }
}

   async deletePost(id) {
    try {
        console.log("Deleting row:", id);

        await this.databases.deleteRow(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            id
        );

        console.log("Row deleted successfully");

        return true;
    } catch (error) {
        console.log("Delete Error:", error);

        return false;
    }
}

    async getPost(slug) {
        try {
            return await this.databases.getRow(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug);
        } catch (error) {
            console.log("appwrite get post error", error);
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]) {
    try {
        return await this.databases.listRows(
            conf.appwriteDatabaseId,
            conf.appwriteCollectionId,
            queries
        );
    } catch (error) {
        console.log("appwrite get posts error", error);
        return { rows: [] };
    }
}
        //file services;
    async uploadFile(file) { 
        try {
            return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
        } catch (error) {
            console.log("appwrite upload file error", error);
        }
    }
    async deleteFile(fileId) {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
            return true;
        } catch (error) {
            console.log("appwrite delete file error"); 
            return false;
            
        }
    }

  getFilePreview(fileId) {
    return this.bucket
        .getFileView(
            conf.appwriteBucketId,
            fileId
        )
        .toString();
}

}

const service = new Service();
export default service;
