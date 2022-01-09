// @ts-nocheck
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { Thought, Genre, Pick, Image, News, NewsGenre } from '@prisma/client/index.d';
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

export type CreateUserInput = {
  email: Scalars['String'];
  idToken: Scalars['String'];
  name: Scalars['String'];
};

export enum CustomErrorResponseCode {
  AlreadyUserExisting = 'ALREADY_USER_EXISTING',
  InvalidRequest = 'INVALID_REQUEST'
}

export type DeleteThoughtInput = {
  id: Scalars['String'];
};

export type DeleteThoughtResponse = {
  __typename?: 'DeleteThoughtResponse';
  id: Scalars['ID'];
};

export enum Genre {
  Business = 'BUSINESS',
  Economy = 'ECONOMY',
  Politics = 'POLITICS',
  Society = 'SOCIETY'
}

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

export type Mutation = {
  __typename?: 'Mutation';
  createPick: Pick;
  createThought: CreateThoughtResponse;
  createUser: User;
  deletePick: Pick;
  deleteThought: DeleteThoughtResponse;
  signOut: SignOutResponse;
  uploadThoughtImages: UploadThoughtImagesResponse;
};


export type MutationCreatePickArgs = {
  input: CreatePickInput;
};


export type MutationCreateThoughtArgs = {
  input: CreateThoughtInput;
};


export type MutationCreateUserArgs = {
  input: CreateUserInput;
};


export type MutationDeletePickArgs = {
  thoughtId: Scalars['ID'];
};


export type MutationDeleteThoughtArgs = {
  input: DeleteThoughtInput;
};


export type MutationUploadThoughtImagesArgs = {
  files: Array<Scalars['Upload']>;
};

export type News = {
  __typename?: 'News';
  articleCreatedAt?: Maybe<Scalars['String']>;
  genre: NewsGenre;
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  link: Scalars['String'];
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
  initialData: InitialResponse;
  news?: Maybe<NewsConnection>;
  thoughts: ThoughtsConnection;
};


export type QueryNewsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  genre: NewsGenre;
};


export type QueryThoughtsArgs = {
  after?: InputMaybe<Scalars['String']>;
  first?: InputMaybe<Scalars['Int']>;
  genre: Genre;
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

export type Thought = {
  __typename?: 'Thought';
  contributor?: Maybe<User>;
  createdAt?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  images: Array<Maybe<Image>>;
  picked: Scalars['Boolean'];
  text: Scalars['String'];
  title?: Maybe<Scalars['String']>;
};

export type ThoughtEdge = {
  __typename?: 'ThoughtEdge';
  cursor: Scalars['String'];
  node: Thought;
};

export type ThoughtsConnection = {
  __typename?: 'ThoughtsConnection';
  edges: Array<ThoughtEdge>;
  pageInfo: PageInfo;
};

export type UploadThoughtImagesResponse = {
  __typename?: 'UploadThoughtImagesResponse';
  images: Array<SubImage>;
};

export type User = {
  __typename?: 'User';
  bio?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  imageUrl?: Maybe<Scalars['String']>;
  name: Scalars['String'];
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
  CreatePickInput: CreatePickInput;
  CreateThoughtInput: CreateThoughtInput;
  CreateThoughtResponse: ResolverTypeWrapper<CreateThoughtResponse>;
  CreateUserInput: CreateUserInput;
  CustomErrorResponseCode: CustomErrorResponseCode;
  DeleteThoughtInput: DeleteThoughtInput;
  DeleteThoughtResponse: ResolverTypeWrapper<DeleteThoughtResponse>;
  Genre: ResolverTypeWrapper<Genre>;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Image: ResolverTypeWrapper<Image>;
  ImageInput: ImageInput;
  InitialResponse: ResolverTypeWrapper<InitialResponse>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Mutation: ResolverTypeWrapper<{}>;
  News: ResolverTypeWrapper<News>;
  NewsConnection: ResolverTypeWrapper<Omit<NewsConnection, 'edges'> & { edges: Array<ResolversTypes['NewsEdge']> }>;
  NewsEdge: ResolverTypeWrapper<Omit<NewsEdge, 'node'> & { node: ResolversTypes['News'] }>;
  NewsGenre: ResolverTypeWrapper<NewsGenre>;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Pick: ResolverTypeWrapper<Pick>;
  Query: ResolverTypeWrapper<{}>;
  SignOutResponse: ResolverTypeWrapper<SignOutResponse>;
  String: ResolverTypeWrapper<Scalars['String']>;
  SubImage: ResolverTypeWrapper<SubImage>;
  Thought: ResolverTypeWrapper<Thought>;
  ThoughtEdge: ResolverTypeWrapper<Omit<ThoughtEdge, 'node'> & { node: ResolversTypes['Thought'] }>;
  ThoughtsConnection: ResolverTypeWrapper<Omit<ThoughtsConnection, 'edges'> & { edges: Array<ResolversTypes['ThoughtEdge']> }>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  UploadThoughtImagesResponse: ResolverTypeWrapper<UploadThoughtImagesResponse>;
  User: ResolverTypeWrapper<User>;
  Void: ResolverTypeWrapper<Scalars['Void']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Boolean: Scalars['Boolean'];
  CreatePickInput: CreatePickInput;
  CreateThoughtInput: CreateThoughtInput;
  CreateThoughtResponse: CreateThoughtResponse;
  CreateUserInput: CreateUserInput;
  DeleteThoughtInput: DeleteThoughtInput;
  DeleteThoughtResponse: DeleteThoughtResponse;
  ID: Scalars['ID'];
  Image: Image;
  ImageInput: ImageInput;
  InitialResponse: InitialResponse;
  Int: Scalars['Int'];
  Mutation: {};
  News: News;
  NewsConnection: Omit<NewsConnection, 'edges'> & { edges: Array<ResolversParentTypes['NewsEdge']> };
  NewsEdge: Omit<NewsEdge, 'node'> & { node: ResolversParentTypes['News'] };
  PageInfo: PageInfo;
  Pick: Pick;
  Query: {};
  SignOutResponse: SignOutResponse;
  String: Scalars['String'];
  SubImage: SubImage;
  Thought: Thought;
  ThoughtEdge: Omit<ThoughtEdge, 'node'> & { node: ResolversParentTypes['Thought'] };
  ThoughtsConnection: Omit<ThoughtsConnection, 'edges'> & { edges: Array<ResolversParentTypes['ThoughtEdge']> };
  Upload: Scalars['Upload'];
  UploadThoughtImagesResponse: UploadThoughtImagesResponse;
  User: User;
  Void: Scalars['Void'];
};

export type CreateThoughtResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['CreateThoughtResponse'] = ResolversParentTypes['CreateThoughtResponse']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DeleteThoughtResponseResolvers<ContextType = Context, ParentType extends ResolversParentTypes['DeleteThoughtResponse'] = ResolversParentTypes['DeleteThoughtResponse']> = {
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

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  createPick?: Resolver<ResolversTypes['Pick'], ParentType, ContextType, RequireFields<MutationCreatePickArgs, 'input'>>;
  createThought?: Resolver<ResolversTypes['CreateThoughtResponse'], ParentType, ContextType, RequireFields<MutationCreateThoughtArgs, 'input'>>;
  createUser?: Resolver<ResolversTypes['User'], ParentType, ContextType, RequireFields<MutationCreateUserArgs, 'input'>>;
  deletePick?: Resolver<ResolversTypes['Pick'], ParentType, ContextType, RequireFields<MutationDeletePickArgs, 'thoughtId'>>;
  deleteThought?: Resolver<ResolversTypes['DeleteThoughtResponse'], ParentType, ContextType, RequireFields<MutationDeleteThoughtArgs, 'input'>>;
  signOut?: Resolver<ResolversTypes['SignOutResponse'], ParentType, ContextType>;
  uploadThoughtImages?: Resolver<ResolversTypes['UploadThoughtImagesResponse'], ParentType, ContextType, RequireFields<MutationUploadThoughtImagesArgs, 'files'>>;
};

export type NewsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['News'] = ResolversParentTypes['News']> = {
  articleCreatedAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  genre?: Resolver<ResolversTypes['NewsGenre'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  link?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  initialData?: Resolver<ResolversTypes['InitialResponse'], ParentType, ContextType>;
  news?: Resolver<Maybe<ResolversTypes['NewsConnection']>, ParentType, ContextType, RequireFields<QueryNewsArgs, 'genre'>>;
  thoughts?: Resolver<ResolversTypes['ThoughtsConnection'], ParentType, ContextType, RequireFields<QueryThoughtsArgs, 'genre'>>;
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

export type ThoughtResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Thought'] = ResolversParentTypes['Thought']> = {
  contributor?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  images?: Resolver<Array<Maybe<ResolversTypes['Image']>>, ParentType, ContextType>;
  picked?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  text?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ThoughtEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['ThoughtEdge'] = ResolversParentTypes['ThoughtEdge']> = {
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  node?: Resolver<ResolversTypes['Thought'], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  imageUrl?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface VoidScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Void'], any> {
  name: 'Void';
}

export type Resolvers<ContextType = Context> = {
  CreateThoughtResponse?: CreateThoughtResponseResolvers<ContextType>;
  DeleteThoughtResponse?: DeleteThoughtResponseResolvers<ContextType>;
  Genre?: GenreResolvers;
  Image?: ImageResolvers<ContextType>;
  InitialResponse?: InitialResponseResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  News?: NewsResolvers<ContextType>;
  NewsConnection?: NewsConnectionResolvers<ContextType>;
  NewsEdge?: NewsEdgeResolvers<ContextType>;
  NewsGenre?: NewsGenreResolvers;
  PageInfo?: PageInfoResolvers<ContextType>;
  Pick?: PickResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  SignOutResponse?: SignOutResponseResolvers<ContextType>;
  SubImage?: SubImageResolvers<ContextType>;
  Thought?: ThoughtResolvers<ContextType>;
  ThoughtEdge?: ThoughtEdgeResolvers<ContextType>;
  ThoughtsConnection?: ThoughtsConnectionResolvers<ContextType>;
  Upload?: GraphQLScalarType;
  UploadThoughtImagesResponse?: UploadThoughtImagesResponseResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
  Void?: GraphQLScalarType;
};

