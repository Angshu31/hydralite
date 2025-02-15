import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { IsAuthenticated } from "~/middleware/isAuthenticated.middleware";
import { CreatePostArgs } from "./args/CreatePostArgs";
import ContextType from "~/types/Context.type";
import { Post, User } from "~/models/index";
import { connectIdArray } from "~/util/connectIdArray";
import { ProjectMemberRepo } from "~/db/ProjectMemberRepo";

const memberRepo = new ProjectMemberRepo();
@Resolver()
export class CreatePostResolver {
  @IsAuthenticated()
  @Mutation(() => Post)
  async createPost(
    @Arg("args") args: CreatePostArgs,
    @Ctx() { req, prisma }: ContextType
  ) {
    // retrieve the currently logged in user
    const user: User = req.user as User;

    type postType = Parameters<typeof prisma.post.create>[0]["data"];
    const post: postType = {
      title: args.title,
      description: args.description,
      isAnnouncement: false,
      hashtags: connectIdArray(args.hashtagIds),
      creator: { connect: { id: user.id } },
      type: args.type,
      isPublic: true,
      project: { connect: { id: args.projectId } },
      labels: connectIdArray(args.labelIds),
    };

    // make sure user can manage posts in this project if they are trying to make an announcement or make a post private
    if (args.isAnnouncement || !args.isPublic || args.visibleToUserIds) {
      const loggedInMember = await memberRepo.findMemberByUserAndProjectId(
        user.id,
        args.projectId
      );
      memberRepo.memberHasPermission(loggedInMember!, "canManagePosts");
      post.isPublic = args.isPublic ?? true;
      post.isAnnouncement = !!args.isAnnouncement;

      post.visibleTo = !args.isPublic
        ? connectIdArray(args.visibleToUserIds)
        : {};
    }

    const createdPost = await prisma.post.create({ data: post });
    return createdPost;
  }
}
