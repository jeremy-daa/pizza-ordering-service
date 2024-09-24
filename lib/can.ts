import { ForbiddenError } from "@casl/ability";
import { NextResponse } from "next/server";

/**
 * Middleware to check if a user has permission for an action
 */
interface RequestWithAbility extends Request {
  ability: any; // Replace `any` with the specific type of ability if known
}

export function can(action: string, subject: string) {
  return (req: RequestWithAbility, res: Response, next: any): void => {
    const ability = req.ability; // Attach ability to the request
    try {
      ForbiddenError.from(ability).throwUnlessCan(action, subject);
      next(); // Proceed if the user has permission
    } catch (error) {
      NextResponse.json({ message: "Access Forbidden" }, { status: 403 });
    }
  };
}
