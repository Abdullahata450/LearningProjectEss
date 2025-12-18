import mongoose from "../config/db.js";
declare const User: mongoose.Model<{
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
}, {}, {}, {
    id: string;
}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
}, {
    id: string;
}, mongoose.DefaultSchemaOptions> & Omit<{
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
}, mongoose.Document<unknown, {}, {
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
}, {
    id: string;
}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    [path: string]: mongoose.SchemaDefinitionProperty<undefined, any, any>;
} | {
    [x: string]: mongoose.SchemaDefinitionProperty<any, any, mongoose.Document<unknown, {}, {
        username: string;
        password: string;
        role: "user" | "admin" | "moderator";
    }, {
        id: string;
    }, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & Omit<{
        username: string;
        password: string;
        role: "user" | "admin" | "moderator";
    } & {
        _id: mongoose.Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, {
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>, {
    username: string;
    password: string;
    role: "user" | "admin" | "moderator";
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>;
export default User;
