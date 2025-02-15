import {
  PrismaClient,
  ProjectMember,
  ProjectMemberPermissions,
} from "@prisma/client";
import { ApolloError } from "apollo-server-express";
import { MemberPerms } from "~/types/MemberPerms.type";

export class ProjectMemberRepo extends PrismaClient {
  findMemberById = async (
    memberId: string,
    validate = true
  ): Promise<ProjectMember | null> => {
    // retrieve member
    const member = this.projectMember.findUnique({ where: { id: memberId } });

    // validation
    if (validate && !member)
      throw new ApolloError("Invalid member Id", "invalid_id");

    return member;
  };

  findMemberByUserAndProjectId = async (
    userId: string,
    projectId: string,
    validate = true
  ) => {
    // retrieve member
    const member = await this.projectMember.findFirst({
      where: { userId, projectId },
      include: { overallPermissions: true, roles: true },
    });

    // validation
    if (validate && !member)
      throw new ApolloError("Invalid user or project id", "invalid_id");

    return member;
  };

  memberHasPermission = (
    member: ProjectMember & {
      overallPermissions: ProjectMemberPermissions | null;
    },
    permissionName: MemberPerms,
    validate = true
  ): boolean => {
    const memberHasPerm = !!(member.overallPermissions as any)?.[
      permissionName
    ];

    if (validate && !memberHasPerm)
      throw new ApolloError(
        "This action requires elevation.",
        "perms_not_sufficient"
      );

    return memberHasPerm;
  };
}
