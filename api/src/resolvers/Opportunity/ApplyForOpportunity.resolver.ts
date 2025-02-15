import { OpportunityApplicant, User } from "~/models/index";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { IsAuthenticated } from "~/middleware/isAuthenticated.middleware";
import { ApplyForOpportunityArgs } from "./args/ApplyForOpportunityArgs";
import ContextType from "~/types/Context.type";
import executeOrFail from "~/util/executeOrFail";

@Resolver()
export class ApplyForOpportunityResolver {
  @Mutation(() => OpportunityApplicant)
  @IsAuthenticated()
  async applyForOpportunity(
    @Arg("args") { opportunityId }: ApplyForOpportunityArgs,
    @Ctx() { req, prisma }: ContextType
  ): Promise<OpportunityApplicant | null> {
    const user: User = req.user as User;

    // TASK: ensure user has the skills that this opportunity demands

    const createdApplicant = executeOrFail(
      async () =>
        await prisma.opportunityApplicant.create({
          data: {
            user: { connect: { id: user.id } },
            opportunity: { connect: { id: opportunityId } },
            isAccepted: false,
            // TASK: also make users write a short description of why they think they should be selected for this job
          },
        })
    );

    // TASK: Send email to people with perms to manage outsourcing

    return createdApplicant;
  }
}
