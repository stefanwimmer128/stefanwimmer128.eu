declare module "*.gql" {
    import {
        DocumentNode,
    } from "graphql";
    
    const gql: DocumentNode | DocumentNode[];
    
    export default gql;
}
