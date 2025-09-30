import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { sendEmail, emailTemplates } from "@/lib/email";

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { type, data } = await request.json();

    if (!type || !data) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let template;

    switch (type) {
      case "welcome":
        template = emailTemplates.welcome(data.name);
        break;
      case "auditRequest":
        template = emailTemplates.auditRequest(
          data.name,
          data.company,
          data.industry,
          data.goal
        );
        break;
      case "subscriptionConfirmation":
        template = emailTemplates.subscriptionConfirmation(
          data.name,
          data.plan,
          data.price
        );
        break;
      case "leadNotification":
        template = emailTemplates.leadNotification(
          data.leadName,
          data.company,
          data.source
        );
        break;
      case "contentPublished":
        template = emailTemplates.contentPublished(
          data.title,
          data.type,
          data.views
        );
        break;
      default:
        return NextResponse.json({ error: "Invalid email type" }, { status: 400 });
    }

    const result = await sendEmail({
      to: data.email || session.user?.email || "",
      subject: template.subject,
      html: template.html,
    });

    if (result.success) {
      return NextResponse.json({ 
        success: true, 
        messageId: result.messageId 
      });
    } else {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
