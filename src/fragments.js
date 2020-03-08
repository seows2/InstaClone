//////////////////Post/SeeFullPost/////////////////////////

export const USER_FRAGMENT = `
    id
    username
    avatar
`;

export const COMMENT_FRAGMENT = `
    id
    text
    user {
        ${USER_FRAGMENT}
    }
`;

export const FILE_FRAGMENT = `
    id
    url
`;

export const FULL_POST_FRAGMENT = `
    fragment list on Post{
        id
        location
        caption
        files {
            ${FILE_FRAGMENT}
        }
        comments {
            ${COMMENT_FRAGMENT}
        }
        user {
            ${USER_FRAGMENT}
        }
    }
`;
//////////////////Post/SeeFullPost/////////////////////////

//////////////////Message/sendMessage/////////////////////////
export const ROOM_FRAGMENT = `
    fragment list on Room{
        id
        participants{
            id
        }
    }
`;
