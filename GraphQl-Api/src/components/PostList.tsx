import { useQuery } from '@apollo/client';
import { GETALLPOSTWITHIDANDUSER } from '../Queries/Queries';
import React from 'react';

const PostList: React.FC = () => {
    const { loading, error, data } = useQuery(GETALLPOSTWITHIDANDUSER);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            {data.posts.data.map(({ id, title, body, user }: any) => (
                <div key={id}>
                    <p><strong>User:</strong> {user.name}</p>
                    <p><strong>Title:</strong> {title}</p>
                    <p><strong>Body:</strong> {body}</p>
                </div>
            ))}
        </div>
    );
}

export default PostList;
