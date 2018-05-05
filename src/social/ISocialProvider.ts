import { IProvider } from "../core/index";
import { IDType } from "../data/index";

export interface ISocialContent {
    ID?: IDType;
    Type?: string;
}
export interface ISocialPostContent extends ISocialContent {
    ContentType?: string;
    Content?: any;
    Statistics?: any;
}

export interface ISocialProvider extends IProvider {
    activateSocial(tenantID: IDType, app: string, userID: IDType, newUsername?: string): Promise<boolean>;
    deactivateSocial(tenantID: IDType, app: string, userID: IDType): Promise<boolean>;

    isUserExistsByUsername(tenantID: IDType, app: string, username: string): Promise<boolean>;

    updateUsername(tenantID: IDType, app: string, currentUsername: string, newUsername: string): Promise<boolean>;

    blockOtherUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType): Promise<boolean>;
    unblockOtherUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType): Promise<boolean>;

    isBlockedUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType): Promise<boolean>;

    getBlockedUsers(tenantID: IDType, app: string, userID: IDType): Promise<IDType[]>;
    getBlockedUserNames(tenantID: IDType, app: string, userID: IDType): Promise<string[]>;

    requestFollowUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType): Promise<boolean>;
    unFollowUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType): Promise<boolean>;
    acceptFollowerUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType): Promise<boolean>;
    rejectFollowerUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType): Promise<boolean>;

    requestConnectUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType,
                       connectType: string): Promise<boolean>;
    breakConnectUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType,
                     connectType: string): Promise<boolean>;
    acceptConnectUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType,
                      connectType: string): Promise<boolean>;
    rejectConnectUser(tenantID: IDType, app: string, userID: IDType, otherID: IDType,
                      connectType: string): Promise<boolean>;
    getSuggestedConnectionUsernames(tenantID: IDType, app: string, userID: IDType,
                                    degree: number, ...connectType: string[]): Promise<string[]>;
    getSuggestedConnectionUsers(tenantID: IDType, app: string, userID: IDType,
                                degree: number, ...connectType: string[]): Promise<IDType[]>;

}

export interface ISocialPostProvider<TPostContent extends ISocialPostContent> extends
    ISocialProvider {
    createPost(tenantID: IDType, app: string, userID: IDType, content: TPostContent): Promise<IDType>;
    publishPost(tenantID: IDType, app: string, userID: IDType, postid: IDType): Promise<IDType>;
    notifyPostToFollowers(tenantID: IDType, app: string, userID: IDType, postid: IDType): Promise<boolean>;

    notifyPostToSubscribers(tenantID: IDType, app: string, userID: IDType, postid: IDType): Promise<boolean>;
    subscribeToPost(tenantID: IDType, app: string, userID: IDType, postid: IDType): Promise<boolean>;
    unsubscribeToPost(tenantID: IDType, app: string, userID: IDType, postid: IDType): Promise<boolean>;

    updatePost(tenantID: IDType, app: string, userID: IDType, content: TPostContent): Promise<IDType>;
    deletePost(tenantID: IDType, app: string, userID: IDType, postid: IDType): Promise<IDType>;
    createPostComment(tenantID: IDType, app: string, userID: IDType,
                      postID: IDType, comment: any, replyToComment?: IDType): Promise<IDType>;
    updatePostComment(tenantID: IDType, app: string, userID: IDType,
                      postID: IDType, commentID: IDType, comment: any): Promise<IDType>;
    deletePostComment(tenantID: IDType, app: string, userID: IDType,
                      postID: IDType, commentID: IDType): Promise<IDType>;
    seenPost(tenantID: IDType, app: string, userID: IDType,
             postID: IDType): Promise<IDType>;
    seenPostComment(tenantID: IDType, app: string, userID: IDType,
                    postID: IDType, commentID: IDType): Promise<IDType>;
    likePost(tenantID: IDType, app: string, userID: IDType,
             postID: IDType): Promise<IDType>;
    unlikePost(tenantID: IDType, app: string, userID: IDType,
               postID: IDType): Promise<IDType>;
    dislikePost(tenantID: IDType, app: string, userID: IDType,
                postID: IDType): Promise<IDType>;
    reportPost(tenantID: IDType, app: string, userID: IDType,
               postID: IDType, causeID: number, causeText: string): Promise<IDType>;
    getRecentPostsByUser(tenantID: IDType, app: string, userID: IDType,
                         startFromPostID: IDType , limit: number, skip: number): Promise<IDType[]>;
    getRecentPostsByUsers(tenantID: IDType, app: string, limit: number,
                          skip: number, ...userID: IDType[]): Promise<IDType[]>;
    getTopLikedPostsByUsers(tenantID: IDType, app: string, userID: IDType,
                            limit: number, skip: number, ...userIDs: IDType[]): Promise<IDType[]>;
    getTopSeenPostsByUsers(tenantID: IDType, app: string,
                           userID: IDType, limit: number, skip: number, ...userIDs: IDType[]): Promise<IDType[]>;
    getRecommendedPosts(tenantID: IDType, app: string, userID: IDType,
                        limit: number, skip: number, ...tags: string[]): Promise<IDType[]>;
    getPostContentByID(tenantID: IDType, app: string, userID: IDType,
                       postID: IDType): Promise<TPostContent>;
    getPostContentsByID(tenantID: IDType, app: string, userID: IDType,
                        ...postIDs: IDType[]): Promise<TPostContent[]>;

}
