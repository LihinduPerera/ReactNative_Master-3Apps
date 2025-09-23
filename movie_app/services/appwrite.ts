// track the searches made by the user
import { Client, Databases, ID, Query } from "react-native-appwrite";

const DATABASE_ID = process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID!;
const TABLE_ID = process.env.EXPO_PUBLIC_APPWRITE_TABLE_ID!;

const client = new Client()
    .setEndpoint(process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID!);

const database = new Databases(client);

export const updateSearchCount = async (query: string, movie: Movie) => {
    //check if a record of that search has already been stored
    //if found, increament the searchCount field
    //if not found, create a new record with searchCount = 1

    try {
        const result = await database.listDocuments(DATABASE_ID, TABLE_ID, [
            Query.equal('searchTerm', query)
        ])

        if (result.documents.length > 0) {
            const exisingMovie = result.documents[0];

            await database.updateDocument(
                DATABASE_ID,
                TABLE_ID,
                exisingMovie.$id,
                {
                    count: exisingMovie.count + 1,
                }
            )
        } else {
            await database.createDocument(DATABASE_ID, TABLE_ID, ID.unique(), {
                searchTerm: query,
                movie_id: movie.id,
                count: 1,
                title: movie.title,
                poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,

            })
        }
    } catch (error) {
        console.log(error);
        throw error;
    }
}