// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Thought, Genre, Pick, Image, News, NewsGenre, NewsPick, User, Follow, ThoughtTalkRoomMessage, ThoughtTalkRoom, ThoughtTalkRoomMember, NewsTalkRoom, NewsTalkRoomMessage } from '@prisma/client/index.d';
import { Context } from '../context';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type EnumResolverSignature<T, AllowedValues = any> = { [key in keyof T]?: AllowedValues };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Upload: Promise<GraphQLFileUpload>;
  Void: void;
};

export type CreateNewsPickInput = {
  newsId: Scalars['Int'];
};

export type CreateNewsPickResponse = {
  __typename?: 'CreateNewsPickResponse';
  id: Scalars['Int'];
};

export type CreatePickInput = {
  thoughtId: Scalars['String'];
};

export type CreateThoughtInput = {
  genre: Genre;
  images?: InputMaybe<Array<ImageInput>>;
  text: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};

export type CreateThoughtResponse = {
  __typename?: 'CreateThoughtResponse';
  id: Scalars['ID'];
};

export type CreateThoughtTalkRoomMessageInput = {
  replyTo?: InputMaybe<Scalars['Int']>;
  roomId: Scalars['Int'];
  text: Scalars['String'];
};

export type CreateUserInput = {
  email: Scalars['String'];
  idToken: Scalars['String'];
  name: Scalars['String'];
};

export type CreateUserThoughtTalkRoomMessageSeenInput = {
  messageId: Scalars['Int'];
  roomId: Scalars['Int'];
};

export enum CustomErrorResponseCode {
  AlreadyUnBloking = 'ALREADY_UN_BLOKING',
  AlreadyUserExisting = 'ALREADY_USER_EXISTING',
  InvalidRequest = 'INVALID_REQUEST',
  NotFound = 'NOT_FOUND'
}

export type DeleteNewsPickInput = {
  newsId: Scalars['Int'];
};

export type DeleteThoughtInput = {
  id: Scalars['String'];
};

export type DeleteThoughtResponse = {
  __typename?: 'DeleteThoughtResponse';
  id: Scalars['ID'];
};

export type DeleteThoughtTalkRoomInput = {
  talkRoomId: Scalars['Int'];
};

export type DeleteThoughtTalkRoomMemberInput = {
  roomId: Scalars['Int'];
  userId: Scalars['ID'];
};

export type Follow = {
  __typename?: 'Follow';
  followeeId: Scalars['ID'];
  followerId: Scalars['ID'];
  id: Scalars['ID'];
};

export enum Genre {
  Business = 'BUSINESS',
  Economy = 'ECONOMY',
  Politics = 'POLITICS',
  Society = 'SOCIETY'
}

export type GetOutThoughtTalkRoomInput = {
  roomId: Scalars['Int'];
};

export type Image = {
  __typename?: 'Image';
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type ImageInput = {
  height?: InputMaybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: InputMaybe<Scalars['Int']>;
};

export type InitialResponse = {
  __typename?: 'InitialResponse';
  me: User;
};

export type JoinNewsTalkRoomInput = {
  newsId: Scalars['Int'];
};

export type JoinTalkInput = {
  contributorId: Scalars['String'];
  thoughtId: Scalars['String'];
};

export type Me = {
  __typename?: 'Me';
  bio?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  twitter?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  block: User;
  createNewsPick: NewsPick;
  createPick: Pick;
  createThought: CreateThoughtResponse;
  createThoughtTalkRoomMessage?: Maybe<ThoughtTalkRoomMessage>;
  createUser: Me;
  createUserThoughtTalkRoomMessageSeen: ThoughtTalkRoom;
  deleteNewsPick: NewsPick;
  deletePick: Pick;
  deleteThought: DeleteThoughtResponse;
  deleteThoughtTalkRoom?: Maybe<Scalars['Boolean']>;
  deleteThoughtTalkRoomMember: ThoughtTalkRoom;
  follow: User;
  getOutThoughtTalkRoom?: Maybe<Scalars['Boolean']>;
  joinNewsTalkRoom: NewsTalkRoom;
  joinThoughtTalk: ThoughtTalkRoom;
  signOut: SignOutResponse;
  unblock: User;
  unfollow: User;
  updateMe: Me;
  uploadImage: SubImage;
  uploadThoughtImages: UploadThoughtImagesResponse;
};


export type MutationBlockArgs = {
  blockTo: Scalars['ID'];
};


export type MutationCreateNewsPickArgs = {
  input: CreateNewsPickInput;
};


export type MutationCreatePickArgs = {
  input: CreatePickInput;
};


export type MutationCreateThoughtArgs = {
  input: CreateThoughtInput;
};


export type MutationCreateThoughtTalkRoomMessageArgs = {
  input: CreateThoughtTalkRoomMessageInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationCreateUserThoughtTalkRoomMessageSeenArgs = {
  input: CreateUserThoughtTalkRoomMessageSeenInput;
};


export type MutationDeleteNewsPickArgs = {
  input: DeleteNewsPickInput;
};


export type MutationDeletePickArgs = {
  thoughtId: Scalars['ID'];
};


export type MutationDeleteThoughtArgs = {
  input: DeleteThoughtInput;
};


export type MutationDeleteThoughtTalkRoomArgs = {
  input: DeleteThoughtTalkRoomInput;
};


export type MutationDeleteThoughtTalkRoomMemberArgs = {
  input: DeleteThoughtTalkRoomMemberInput;
};


export type MutationFollowArgs = {
  followeeId: Scalars['ID'];
};


export type MutationGetOutThoughtTalkRoomArgs = {
  input: GetOutThoughtTalkRoomInput;
};


export type MutationJoinNewsTalkRoomArgs = {
  input: JoinNewsTalkRoomInput;
};


export type MutationJoinThoughtTalkArgs = {
  input: JoinTalkInput;
};


export type MutationUnblockArgs = {
  blockedUserId: Scalars['ID'];
};


export type MutationUnfollowArgs = {
  followeeId: Scalars['ID'];
};


export type MutationUpdateMeArgs = {
  input: UpdateMeInput;
};


export type MutationUploadImageArgs = {
  file: Scalars['Upload'];
};


export type MutationUploadThoughtImagesArgs = {
  files: Array<Scalars['Upload']>;
};

export type News = {
  __typename?: 'News';
  articleCreatedAt?: Maybe<Scalars['String']>;
  genre: NewsGenre;
  id: Scalars['Int'];
  image?: Maybe<Scalars['String']>;
  link: Scalars['String'];
  picked: Scalars['Boolean'];
  provider?: Maybe<Scalars['String']>;
  title: Scalars['String'];
};

export type NewsConnection = {
  __typename?: 'NewsConnection';
  edges: Array<NewsEdge>;
  pageInfo: PageInfo;
};

export type NewsEdge = {
  __typename?: 'NewsEdge';
  cursor: Scalars['String'];
  node: News;
};

export enum NewsGenre {
  Business = 'BUSINESS',
  Economy = 'ECONOMY',
  Politics = 'POLITICS',
  Technology = 'TECHNOLOGY'
}

export type NewsPick = {
  __typename?: 'NewsPick';
  id: Scalars['Int'];
  newsId: Scalars['Int'];
};

export type NewsTalkRoom = TalkRoom & {
  __typename?: 'NewsTalkRoom';
  allMessageSeen?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  members?: Maybe<NewsTalkRoomMemberConnection>;
  news?: Maybe<News>;
  updatedAt?: Maybe<Scalars['String']>;
};


export type NewsTalkRoomMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};

export type NewsTalkRoomMember = TalkRoomMember & {
  __typename?: 'NewsTalkRoomMember';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  talkRoom?: Maybe<NewsTalkRoom>;
  user: User;
};

export type NewsTalkRoomMemberConnection = {
  __typename?: 'NewsTalkRoomMemberConnection';
  edges: Array<NewsTalkRoomMemberEdge>;
  pageInfo: PageInfo;
};

export type NewsTalkRoomMemberEdge = {
  __typename?: 'NewsTalkRoomMemberEdge';
  cursor: Scalars['String'];
  node: NewsTalkRoomMember;
};

export type NewsTalkRoomMessage = TalkRoomMessage & {
  __typename?: 'NewsTalkRoomMessage';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  replyMessage?: Maybe<NewsTalkRoomMessage>;
  roomId?: Maybe<Scalars['Int']>;
  sender?: Maybe<User>;
  talkRoom?: Maybe<NewsTalkRoom>;
  text: Scalars['String'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  endCursor?: Maybe<Scalars['String']>;
  hasNextPage: Scalars['Boolean'];
  hasPreviousPage: Scalars['Boolean'];
  startCursor?: Maybe<Scalars['String']>;
};

export type Pick = {
  __typename?: 'Pick';
  id: Scalars['ID'];
  thoughtId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  blockingUsers: Array<Maybe<User>>;
  follows: UserConnection;
  initialData: InitialResponse;
  me: Me;
  news?: Maybe<NewsConnection>;
  pickedNews: NewsConnection;
  pickedThoughts: ThoughtsConnection;
  thoughtTalkRoom: ThoughtTalkRoom;
  thoughtTalkRooms: Array<Maybe<ThoughtTalkRoom>>;
  thoughts: ThoughtsConnection;
  user: User;
  userThoughts: ThoughtsConnection;
};


export type QueryFollowsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  q?: InputMaybe<Scalars['String']>;
};


export type QueryNewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  genre: NewsGenre;
};


export type QueryPickedNewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type QueryPickedThoughtsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};


export type QueryThoughtTalkRoomArgs = {
  id: Scalars['Int'];
};


export type QueryThoughtsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  follow?: InputMaybe<Scalars['Boolean']>;
  genre?: InputMaybe<Genre>;
};


export type QueryUserArgs = {
  id: Scalars['ID'];
};


export type QueryUserThoughtsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
  userId: Scalars['ID'];
};

export type SignOutResponse = {
  __typename?: 'SignOutResponse';
  id: Scalars['ID'];
};

export type SubImage = {
  __typename?: 'SubImage';
  height?: Maybe<Scalars['Int']>;
  url: Scalars['String'];
  width?: Maybe<Scalars['Int']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  thoughtTalkRoomMessageCreated?: Maybe<ThoughtTalkRoomMessage>;
};


export type SubscriptionThoughtTalkRoomMessageCreatedArgs = {
  roomIds: Array<InputMaybe<Scalars['Int']>>;
  userId: Scalars['ID'];
};

export type TalkRoom = {
  allMessageSeen?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  updatedAt?: Maybe<Scalars['String']>;
};

export type TalkRoomMember = {
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  talkRoom?: Maybe<TalkRoom>;
  user: User;
};

export type TalkRoomMessage = {
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  roomId?: Maybe<Scalars['Int']>;
  sender?: Maybe<User>;
  text: Scalars['String'];
};

export type Thought = {
  __typename?: 'Thought';
  contributor?: Maybe<User>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images: Array<Maybe<Image>>;
  picked?: Maybe<Scalars['Boolean']>;
  text: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type ThoughtEdge = {
  __typename?: 'ThoughtEdge';
  cursor: Scalars['String'];
  node: Thought;
};

export type ThoughtTalkRoom = TalkRoom & {
  __typename?: 'ThoughtTalkRoom';
  allMessageSeen?: Maybe<Scalars['Boolean']>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  members?: Maybe<ThoughtTalkRoomMemberConnection>;
  messages?: Maybe<ThoughtTalkRoomMessageConnection>;
  thought?: Maybe<Thought>;
  updatedAt?: Maybe<Scalars['String']>;
};


export type ThoughtTalkRoomMembersArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
};


export type ThoughtTalkRoomMessagesArgs = {
  after?: InputMaybe<Scalars['String']>;
  first: Scalars['Int'];
};

export type ThoughtTalkRoomMember = TalkRoomMember & {
  __typename?: 'ThoughtTalkRoomMember';
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['Int'];
  talkRoom?: Maybe<ThoughtTalkRoom>;
  user: User;
};

export type ThoughtTalkRoomMemberConnection = {
  __typename?: 'ThoughtTalkRoomMemberConnection';
  edges: Array<ThoughtTalkRoomMemberEdge>;
  pageInfo: PageInfo;
};

export type ThoughtTalkRoomMemberEdge = {
  __typename?: 'ThoughtTalkRoomMemberEdge';
  cursor: Scalars['String'];
  node: ThoughtTalkRoomMember;
};

export type ThoughtTalkRoomMessage = TalkRoomMessage & {
  __typename?: 'ThoughtTalkRoomMessage';
  createdAt: Scalars['String'];
  id: Scalars['Int'];
  replyMessage?: Maybe<ThoughtTalkRoomMessage>;
  roomId?: Maybe<Scalars['Int']>;
  sender?: Maybe<User>;
  talkRoom?: Maybe<ThoughtTalkRoom>;
  text: Scalars['String'];
};

export type ThoughtTalkRoomMessageConnection = {
  __typename?: 'ThoughtTalkRoomMessageConnection';
  edges: Array<ThoughtTalkRoomMessageEdge>;
  pageInfo: PageInfo;
};

export type ThoughtTalkRoomMessageEdge = {
  __typename?: 'ThoughtTalkRoomMessageEdge';
  cursor: Scalars['String'];
  node: ThoughtTalkRoomMessage;
};

export type ThoughtsConnection = {
  __typename?: 'ThoughtsConnection';
  edges: Array<ThoughtEdge>;
  pageInfo: PageInfo;
};

export type UpdateMeInput = {
  bio?: InputMaybe<Scalars['String']>;
  facebook?: InputMaybe<Scalars['String']>;
  imageUrl?: InputMaybe<Scalars['String']>;
  instagram?: InputMaybe<Scalars['String']>;
  linkedin?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  twitter?: InputMaybe<Scalars['String']>;
};

export type UploadThoughtImagesResponse = {
  __typename?: 'UploadThoughtImagesResponse';
  images: Array<SubImage>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  blocking?: Maybe<Scalars['Boolean']>;
  facebook?: Maybe<Scalars['String']>;
  follow?: Maybe<Scalars['Boolean']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  instagram?: Maybe<Scalars['String']>;
  linkedin?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  twitter?: Maybe<Scalars['String']>;
};

export type UserConnection = {
  __typename?: 'UserConnection';
  edges: Array<UserEdge>;
  pageInfo: PageInfo;
};

export type UserEdge = {
  __typename?: 'UserEdge';
  cursor: Scalars['String'];
  node: User;
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  CreateNewsPickInput: CreateNewsPickInput;
  CreateNewsPickResponse: ResolverTypeWrapper<CreateNewsPickResponse>;
  CreatePickInput: CreatePickInput;
  CreateThoughtInput: CreateThoughtInput;
  CreateThoughtResponse: ResolverTypeWrapper<CreateThoughtResponse>;
  CreateThoughtTalkRoomMessageInput: CreateThoughtTalkRoomMessageInput;
  CreateUserInput: CreateUserInput;
  CreateUserThoughtTalkRoomMessageSeenInput: CreateUserThoughtTalkRoomMessageSeenInput;
  CustomErrorResponseCode: CustomErrorResponseCode;
  DeleteNewsPickInput: DeleteNewsPickInput;
  DeleteThoughtInput: DeleteThoughtInput;
  DeleteThoughtResponse: ResolverTypeWrapper<DeleteThoughtResponse>;
  DeleteThoughtTalkRoomInput: DeleteThoughtTalkRoomInput;
  DeleteThoughtTalkRoomMemberInput: DeleteThoughtTalkRoomMemberInput;
  Follow: ResolverTypeWrapper<Follow>;
  Genre: ResolverTypeWrapper<Genre>;
  GetOutThoughtTalkRoomInput: GetOutThoughtTalkRoomInput;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  ImageInput: ImageInput;
  InitialResponse: ResolverTypeWrapper<Omit<InitialResponse, 'me'> & { me: ResolversTypes['User'] }>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  JoinNewsTalkRoomInput: JoinNewsTalkRoomInput;
  JoinTalkInput: JoinTalkInput;
  Me: ResolverTypeWrapper<User>;
  Mutation: ResolverTypeWrapper<{}>;
  News: ResolverTypeWrapper<News>;
  NewsConnection: ResolverTypeWrapper<Omit<NewsConnection, 'edges'> & { edges: Array<ResolversTypes['NewsEdge']> }>;
  NewsEdge: ResolverTypeWrapper<Omit<NewsEdge, 'node'> & { node: ResolversTypes['News'] }>;
  NewsGenre: ResolverTypeWrapper<NewsGenre>;
  NewsPick: ResolverTypeWrapper<NewsPick>;
  NewsTalkRoom: ResolverTypeWrapper<NewsTalkRoom>;
  NewsTalkRoomMember: ResolverTypeWrapper<Omit<NewsTalkRoomMember, 'talkRoom' | 'user'> & { talkRoom?: Maybe<ResolversTypes['NewsTalkRoom']>, user: ResolversTypes['User'] }>;
  NewsTalkRoomMemberConnection: ResolverTypeWrapper<Omit<NewsTalkRoomMemberConnection, 'edges'> & { edges: Array<ResolversTypes['NewsTalkRoomMemberEdge']> }>;
  NewsTalkRoomMemberEdge: ResolverTypeWrapper<Omit<NewsTalkRoomMemberEdge, 'node'> & { node: ResolversTypes['NewsTalkRoomMember'] }>;
  NewsTalkRoomMessage: ResolverTypeWrapper<NewsTalkRoomMessage>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Pick: ResolverTypeWrapper<Pick>;
  Query: ResolverTypeWrapper<{}>;
  SignOutResponse: ResolverTypeWrapper<SignOutResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  SubImage: ResolverTypeWrapper<SubImage>;
  Subscription: ResolverTypeWrapper<{}>;
  TalkRoom: ResolversTypes['NewsTalkRoom'] | ResolversTypes['ThoughtTalkRoom'];
  TalkRoomMember: ResolversTypes['NewsTalkRoomMember'] | ResolversTypes['ThoughtTalkRoomMember'];
  TalkRoomMessage: ResolversTypes['NewsTalkRoomMessage'] | ResolversTypes['ThoughtTalkRoomMessage'];
  Thought: ResolverTypeWrapper<Thought>;
  ThoughtEdge: ResolverTypeWrapper<Omit<ThoughtEdge, 'node'> & { node: ResolversTypes['Thought'] }>;
  ThoughtTalkRoom: ResolverTypeWrapper<ThoughtTalkRoom>;
  ThoughtTalkRoomMember: ResolverTypeWrapper<ThoughtTalkRoomMember>;
  ThoughtTalkRoomMemberConnection: ResolverTypeWrapper<Omit<ThoughtTalkRoomMemberConnection, 'edges'> & { edges: Array<ResolversTypes['ThoughtTalkRoomMemberEdge']> }>;
  ThoughtTalkRoomMemberEdge: ResolverTypeWrapper<Omit<ThoughtTalkRoomMemberEdge, 'node'> & { node: ResolversTypes['ThoughtTalkRoomMember'] }>;
  ThoughtTalkRoomMessage: ResolverTypeWrapper<ThoughtTalkRoomMessage>;
  ThoughtTalkRoomMessageConnection: ResolverTypeWrapper<Omit<ThoughtTalkRoomMessageConnection, 'edges'> & { edges: Array<ResolversTypes['ThoughtTalkRoomMessageEdge']> }>;
  ThoughtTalkRoomMessageEdge: ResolverTypeWrapper<Omit<ThoughtTalkRoomMessageEdge, 'node'> & { node: ResolversTypes['ThoughtTalkRoomMessage'] }>;
  ThoughtsConnection: ResolverTypeWrapper<Omit<ThoughtsConnection, 'edges'> & { edges: Array<ResolversTypes['ThoughtEdge']> }>;
  UpdateMeInput: UpdateMeInput;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UploadThoughtImagesResponse: ResolverTypeWrapper<UploadThoughtImagesResponse>;
  User: ResolverTypeWrapper<User>;
  UserConnection: ResolverTypeWrapper<Omit<UserConnection, 'edges'> & { edges: Array<ResolversTypes['UserEdge']> }>;
  UserEdge: ResolverTypeWrapper<Omit<UserEdge, 'node'> & { node: ResolversTypes['User'] }>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreateNewsPickInput: CreateNewsPickInput;
  CreateNewsPickResponse: CreateNewsPickResponse;
  CreatePickInput: CreatePickInput;
  CreateThoughtInput: CreateThoughtInput;
  CreateThoughtResponse: CreateThoughtResponse;
  CreateThoughtTalkRoomMessageInput: CreateThoughtTalkRoomMessageInput;
  CreateUserInput: CreateUserInput;
  CreateUserThoughtTalkRoomMessageSeenInput: CreateUserThoughtTalkRoomMessageSeenInput;
  DeleteNewsPickInput: DeleteNewsPickInput;
  DeleteThoughtInput: DeleteThoughtInput;
  DeleteThoughtResponse: DeleteThoughtResponse;
  DeleteThoughtTalkRoomInput: DeleteThoughtTalkRoomInput;
  DeleteThoughtTalkRoomMemberInput: DeleteThoughtTalkRoomMemberInput;
  Follow: Follow;
  GetOutThoughtTalkRoomInput: GetOutThoughtTalkRoomInput;
  ID: Scalars['ID'];
  Image: Image;
  ImageInput: ImageInput;
  InitialResponse: Omit<InitialResponse, 'me'> & { me: ResolversParentTypes['User'] };
  Int: Scalars['Int'];
  JoinNewsTalkRoomInput: JoinNewsTalkRoomInput;
  JoinTalkInput: JoinTalkInput;
  Me: User;
  Mutation: {};
  News: News;
  NewsConnection: Omit<NewsConnection, 'edges'> & { edges: Array<ResolversParentTypes['NewsEdge']> };
  NewsEdge: Omit<NewsEdge, 'node'> & { node: ResolversParentTypes['News'] };
  NewsPick: NewsPick;
  NewsTalkRoom: NewsTalkRoom;
  NewsTalkRoomMember: Omit<NewsTalkRoomMember, 'talkRoom' | 'user'> & { talkRoom?: Maybe<ResolversParentTypes['NewsTalkRoom']>, user: ResolversParentTypes['User'] };
  NewsTalkRoomMemberConnection: Omit<NewsTalkRoomMemberConnection, 'edges'> & { edges: Array<ResolversParentTypes['NewsTalkRoomMemberEdge']> };
  NewsTalkRoomMemberEdge: Omit<NewsTalkRoomMemberEdge, 'node'> & { node: ResolversParentTypes['NewsTalkRoomMember'] };
  NewsTalkRoomMessage: NewsTalkRoomMessage;
  PageInfo: PageInfo;
  Pick: Pick;
  Query: {};
  SignOutResponse: SignOutResponse;
  String: Scalars['String'];
  SubImage: SubImage;
  Subscription: {};
  TalkRoom: ResolversParentTypes['NewsTalkRoom'] | ResolversParentTypes['ThoughtTalkRoom'];
  TalkRoomMember: ResolversParentTypes['NewsTalkRoomMember'] | ResolversParentTypes['ThoughtTalkRoomMember'];
  TalkRoomMessage: ResolversParentTypes['NewsTalkRoomMessage'] | ResolversParentTypes['ThoughtTalkRoomMessage'];
  Thought: Thought;
  ThoughtEdge: Omit<ThoughtEdge, 'node'> & { node: ResolversParentTypes['Thought'] };
  ThoughtTalkRoom: ThoughtTalkRoom;
  ThoughtTalkRoomMember: ThoughtTalkRoomMember;
  ThoughtTalkRoomMemberConnection: Omit<ThoughtTalkRoomMemberConnection, 'edges'> & { edges: Array<ResolversParentTypes['ThoughtTalkRoomMemberEdge']> };
  ThoughtTalkRoomMemberEdge: Omit<ThoughtTalkRoomMemberEdge, 'node'> & { node: ResolversParentTypes['ThoughtTalkRoomMember'] };
  ThoughtTalkRoomMessage: ThoughtTalkRoomMessage;
  ThoughtTalkRoomMessageConnection: Omit<ThoughtTalkRoomMessageConnection, 'edges'> & { edges: Array<ResolversParentTypes['ThoughtTalkRoomMessageEdge']> };
  ThoughtTalkRoomMessageEdge: Omit<ThoughtTalkRoomMessageEdge, 'node'> & { node: ResolversParentTypes['ThoughtTalkRoomMessage'] };
  ThoughtsConnection: Omit<ThoughtsConnection, 'edges'> & { edges: Array<ResolversParentTypes['ThoughtEdge']> };
  UpdateMeInput: UpdateMeInput;
  Upload: Scalars['Upload'];
  UploadThoughtImagesResponse: UploadThoughtImagesResponse;
  User: User;
  UserConnection: Omit<UserConnection, 'edges'> & { edges: Array<ResolversParentTypes['UserEdge']> };
  UserEdge: Omit<UserEdge, 'node'> & { node: ResolversParentTypes['User'] };
  Void: Scalars['Void'];
};

export type CreateNewsPickResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateNewsPickResponse'] = ResolversParentTypes['CreateNewsPickResponse']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CreateThoughtResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateThoughtResponse'] = ResolversParentTypes['CreateThoughtResponse']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteThoughtResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteThoughtResponse'] = ResolversParentTypes['DeleteThoughtResponse']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type FollowResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Follow'] = ResolversParentTypes['Follow']> = {
  followeeId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  followerId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type GenreResolvers = EnumResolverSignature<{ BUSINESS?: any, ECONOMY?: any, POLITICS?: any, SOCIETY?: any }, ResolversTypes['Genre']>;

export type ImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Image'] = ResolversParentTypes['Image']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type InitialResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['InitialResponse'] = ResolversParentTypes['InitialResponse']> = {
  me?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Me'] = ResolversParentTypes['Me']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  block?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationBlockArgs, 'blockTo'>>;
  createNewsPick?: Resolver<ResolversTypes['NewsPick'], ParentType, ContextType, RequireFields<MutationCreateNewsPickArgs, 'input'>>;
  createPick?: Resolver<ResolversTypes['Pick'], ParentType, ContextType, RequireFields<MutationCreatePickArgs, 'input'>>;
  createThought?: Resolver<ResolversTypes['CreateThoughtResponse'], ParentType, ContextType, RequireFields<MutationCreateThoughtArgs, 'input'>>;
  createThoughtTalkRoomMessage?: Resolver<Maybe<ResolversTypes['ThoughtTalkRoomMessage']>, ParentType, ContextType, RequireFields<MutationCreateThoughtTalkRoomMessageArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  createUserThoughtTalkRoomMessageSeen?: Resolver<ResolversTypes['ThoughtTalkRoom'], ParentType, ContextType, RequireFields<MutationCreateUserThoughtTalkRoomMessageSeenArgs, 'input'>>;
  deleteNewsPick?: Resolver<ResolversTypes['NewsPick'], ParentType, ContextType, RequireFields<MutationDeleteNewsPickArgs, 'input'>>;
  deletePick?: Resolver<ResolversTypes['Pick'], ParentType, ContextType, RequireFields<MutationDeletePickArgs, 'thoughtId'>>;
  deleteThought?: Resolver<ResolversTypes['DeleteThoughtResponse'], ParentType, ContextType, RequireFields<MutationDeleteThoughtArgs, 'input'>>;
  deleteThoughtTalkRoom?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationDeleteThoughtTalkRoomArgs, 'input'>>;
  deleteThoughtTalkRoomMember?: Resolver<ResolversTypes['ThoughtTalkRoom'], ParentType, ContextType, RequireFields<MutationDeleteThoughtTalkRoomMemberArgs, 'input'>>;
  follow?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationFollowArgs, 'followeeId'>>;
  getOutThoughtTalkRoom?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType, RequireFields<MutationGetOutThoughtTalkRoomArgs, 'input'>>;
  joinNewsTalkRoom?: Resolver<ResolversTypes['NewsTalkRoom'], ParentType, ContextType, RequireFields<MutationJoinNewsTalkRoomArgs, 'input'>>;
  joinThoughtTalk?: Resolver<ResolversTypes['ThoughtTalkRoom'], ParentType, ContextType, RequireFields<MutationJoinThoughtTalkArgs, 'input'>>;
  signOut?: Resolver<ResolversTypes['SignOutResponse'], ParentType, ContextType>;
  unblock?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUnblockArgs, 'blockedUserId'>>;
  unfollow?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationUnfollowArgs, 'followeeId'>>;
  updateMe?: Resolver<ResolversTypes['Me'], ParentType, ContextType, RequireFields<MutationUpdateMeArgs, 'input'>>;
  uploadImage?: Resolver<ResolversTypes['SubImage'], ParentType, ContextType, RequireFields<MutationUploadImageArgs, 'file'>>;
  uploadThoughtImages?: Resolver<ResolversTypes['UploadThoughtImagesResponse'], ParentType, ContextType, RequireFields<MutationUploadThoughtImagesArgs, 'files'>>;
};

export type NewsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['News'] = ResolversParentTypes['News']> = {
  articleCreatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['NewsGenre'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  picked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  provider?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsConnection'] = ResolversParentTypes['NewsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['NewsEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsEdge'] = ResolversParentTypes['NewsEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['News'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsGenreResolvers = EnumResolverSignature<{ BUSINESS?: any, ECONOMY?: any, POLITICS?: any, TECHNOLOGY?: any }, ResolversTypes['NewsGenre']>;

export type NewsPickResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsPick'] = ResolversParentTypes['NewsPick']> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  newsId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsTalkRoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsTalkRoom'] = ResolversParentTypes['NewsTalkRoom']> = {
  allMessageSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['NewsTalkRoomMemberConnection']>, ParentType, ContextType, RequireFields<NewsTalkRoomMembersArgs, never>>;
  news?: Resolver<Maybe<ResolversTypes['News']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsTalkRoomMemberResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsTalkRoomMember'] = ResolversParentTypes['NewsTalkRoomMember']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  talkRoom?: Resolver<Maybe<ResolversTypes['NewsTalkRoom']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsTalkRoomMemberConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsTalkRoomMemberConnection'] = ResolversParentTypes['NewsTalkRoomMemberConnection']> = {
  edges?: Resolver<Array<ResolversTypes['NewsTalkRoomMemberEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsTalkRoomMemberEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsTalkRoomMemberEdge'] = ResolversParentTypes['NewsTalkRoomMemberEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['NewsTalkRoomMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type NewsTalkRoomMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['NewsTalkRoomMessage'] = ResolversParentTypes['NewsTalkRoomMessage']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replyMessage?: Resolver<Maybe<ResolversTypes['NewsTalkRoomMessage']>, ParentType, ContextType>;
  roomId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  talkRoom?: Resolver<Maybe<ResolversTypes['NewsTalkRoom']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = {
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  hasPreviousPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  startCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PickResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Pick'] = ResolversParentTypes['Pick']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  thoughtId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  blockingUsers?: Resolver<Array<Maybe<ResolversTypes['User']>>, ParentType, ContextType>;
  follows?: Resolver<ResolversTypes['UserConnection'], ParentType, ContextType, RequireFields<QueryFollowsArgs, 'first'>>;
  initialData?: Resolver<ResolversTypes['InitialResponse'], ParentType, ContextType>;
  me?: Resolver<ResolversTypes['Me'], ParentType, ContextType>;
  news?: Resolver<Maybe<ResolversTypes['NewsConnection']>, ParentType, ContextType, RequireFields<QueryNewsArgs, 'genre'>>;
  pickedNews?: Resolver<ResolversTypes['NewsConnection'], ParentType, ContextType, RequireFields<QueryPickedNewsArgs, 'first'>>;
  pickedThoughts?: Resolver<ResolversTypes['ThoughtsConnection'], ParentType, ContextType, RequireFields<QueryPickedThoughtsArgs, 'first'>>;
  thoughtTalkRoom?: Resolver<ResolversTypes['ThoughtTalkRoom'], ParentType, ContextType, RequireFields<QueryThoughtTalkRoomArgs, 'id'>>;
  thoughtTalkRooms?: Resolver<Array<Maybe<ResolversTypes['ThoughtTalkRoom']>>, ParentType, ContextType>;
  thoughts?: Resolver<ResolversTypes['ThoughtsConnection'], ParentType, ContextType, RequireFields<QueryThoughtsArgs, never>>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<QueryUserArgs, 'id'>>;
  userThoughts?: Resolver<ResolversTypes['ThoughtsConnection'], ParentType, ContextType, RequireFields<QueryUserThoughtsArgs, 'first' | 'userId'>>;
};

export type SignOutResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SignOutResponse'] = ResolversParentTypes['SignOutResponse']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubImageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SubImage'] = ResolversParentTypes['SubImage']> = {
  height?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  width?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  thoughtTalkRoomMessageCreated?: SubscriptionResolver<Maybe<ResolversTypes['ThoughtTalkRoomMessage']>, "thoughtTalkRoomMessageCreated", ParentType, ContextType, RequireFields<SubscriptionThoughtTalkRoomMessageCreatedArgs, 'roomIds' | 'userId'>>;
};

export type TalkRoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TalkRoom'] = ResolversParentTypes['TalkRoom']> = {
  __resolveType: TypeResolveFn<'NewsTalkRoom' | 'ThoughtTalkRoom', ParentType, ContextType>;
  allMessageSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
};

export type TalkRoomMemberResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TalkRoomMember'] = ResolversParentTypes['TalkRoomMember']> = {
  __resolveType: TypeResolveFn<'NewsTalkRoomMember' | 'ThoughtTalkRoomMember', ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  talkRoom?: Resolver<Maybe<ResolversTypes['TalkRoom']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
};

export type TalkRoomMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TalkRoomMessage'] = ResolversParentTypes['TalkRoomMessage']> = {
  __resolveType: TypeResolveFn<'NewsTalkRoomMessage' | 'ThoughtTalkRoomMessage', ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  roomId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
};

export type ThoughtResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Thought'] = ResolversParentTypes['Thought']> = {
  contributor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['Image']>>, ParentType, ContextType>;
  picked?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtEdge'] = ResolversParentTypes['ThoughtEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Thought'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtTalkRoomResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtTalkRoom'] = ResolversParentTypes['ThoughtTalkRoom']> = {
  allMessageSeen?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  members?: Resolver<Maybe<ResolversTypes['ThoughtTalkRoomMemberConnection']>, ParentType, ContextType, RequireFields<ThoughtTalkRoomMembersArgs, never>>;
  messages?: Resolver<Maybe<ResolversTypes['ThoughtTalkRoomMessageConnection']>, ParentType, ContextType, RequireFields<ThoughtTalkRoomMessagesArgs, 'first'>>;
  thought?: Resolver<Maybe<ResolversTypes['Thought']>, ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtTalkRoomMemberResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtTalkRoomMember'] = ResolversParentTypes['ThoughtTalkRoomMember']> = {
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  talkRoom?: Resolver<Maybe<ResolversTypes['ThoughtTalkRoom']>, ParentType, ContextType>;
  user?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtTalkRoomMemberConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtTalkRoomMemberConnection'] = ResolversParentTypes['ThoughtTalkRoomMemberConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ThoughtTalkRoomMemberEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtTalkRoomMemberEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtTalkRoomMemberEdge'] = ResolversParentTypes['ThoughtTalkRoomMemberEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ThoughtTalkRoomMember'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtTalkRoomMessageResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtTalkRoomMessage'] = ResolversParentTypes['ThoughtTalkRoomMessage']> = {
  createdAt?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  replyMessage?: Resolver<Maybe<ResolversTypes['ThoughtTalkRoomMessage']>, ParentType, ContextType>;
  roomId?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  sender?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  talkRoom?: Resolver<Maybe<ResolversTypes['ThoughtTalkRoom']>, ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtTalkRoomMessageConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtTalkRoomMessageConnection'] = ResolversParentTypes['ThoughtTalkRoomMessageConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ThoughtTalkRoomMessageEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtTalkRoomMessageEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtTalkRoomMessageEdge'] = ResolversParentTypes['ThoughtTalkRoomMessageEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['ThoughtTalkRoomMessage'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtsConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtsConnection'] = ResolversParentTypes['ThoughtsConnection']> = {
  edges?: Resolver<Array<ResolversTypes['ThoughtEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type UploadThoughtImagesResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UploadThoughtImagesResponse'] = ResolversParentTypes['UploadThoughtImagesResponse']> = {
  images?: Resolver<Array<ResolversTypes['SubImage']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<ContextType = Context, ParentType extends ResolversParentTypes['User'] = ResolversParentTypes['User']> = {
  bio?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  blocking?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  facebook?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  follow?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  instagram?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  linkedin?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  twitter?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserConnection'] = ResolversParentTypes['UserConnection']> = {
  edges?: Resolver<Array<ResolversTypes['UserEdge']>, ParentType, ContextType>;
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['UserEdge'] = ResolversParentTypes['UserEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['User'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = Context> = {
  CreateNewsPickResponse?: CreateNewsPickResponseResolvers<ContextType>;
  CreateThoughtResponse?: CreateThoughtResponseResolvers<ContextType>;
  DeleteThoughtResponse?: DeleteThoughtResponseResolvers<ContextType>;
  Follow?: FollowResolvers<ContextType>;
  Genre?: GenreResolvers;
  Image?: ImageResolvers<ContextType>;
  InitialResponse?: InitialResponseResolvers<ContextType>;
  Me?: MeResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  News?: NewsResolvers<ContextType>;
  NewsConnection?: NewsConnectionResolvers<ContextType>;
  NewsEdge?: NewsEdgeResolvers<ContextType>;
  NewsGenre?: NewsGenreResolvers;
  NewsPick?: NewsPickResolvers<ContextType>;
  NewsTalkRoom?: NewsTalkRoomResolvers<ContextType>;
  NewsTalkRoomMember?: NewsTalkRoomMemberResolvers<ContextType>;
  NewsTalkRoomMemberConnection?: NewsTalkRoomMemberConnectionResolvers<ContextType>;
  NewsTalkRoomMemberEdge?: NewsTalkRoomMemberEdgeResolvers<ContextType>;
  NewsTalkRoomMessage?: NewsTalkRoomMessageResolvers<ContextType>;
  PageInfo?: PageInfoResolvers<ContextType>;
  Pick?: PickResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignOutResponse?: SignOutResponseResolvers<ContextType>;
  SubImage?: SubImageResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  TalkRoom?: TalkRoomResolvers<ContextType>;
  TalkRoomMember?: TalkRoomMemberResolvers<ContextType>;
  TalkRoomMessage?: TalkRoomMessageResolvers<ContextType>;
  Thought?: ThoughtResolvers<ContextType>;
  ThoughtEdge?: ThoughtEdgeResolvers<ContextType>;
  ThoughtTalkRoom?: ThoughtTalkRoomResolvers<ContextType>;
  ThoughtTalkRoomMember?: ThoughtTalkRoomMemberResolvers<ContextType>;
  ThoughtTalkRoomMemberConnection?: ThoughtTalkRoomMemberConnectionResolvers<ContextType>;
  ThoughtTalkRoomMemberEdge?: ThoughtTalkRoomMemberEdgeResolvers<ContextType>;
  ThoughtTalkRoomMessage?: ThoughtTalkRoomMessageResolvers<ContextType>;
  ThoughtTalkRoomMessageConnection?: ThoughtTalkRoomMessageConnectionResolvers<ContextType>;
  ThoughtTalkRoomMessageEdge?: ThoughtTalkRoomMessageEdgeResolvers<ContextType>;
  ThoughtsConnection?: ThoughtsConnectionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UploadThoughtImagesResponse?: UploadThoughtImagesResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  UserConnection?: UserConnectionResolvers<ContextType>;
  UserEdge?: UserEdgeResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

