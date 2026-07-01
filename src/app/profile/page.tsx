import { ProfilePageContent } from "@/components/profile/profile-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { checkoutCopy } from "@/constants/checkout";

export const metadata = createPageMetadata({
  title: checkoutCopy.profileTitle,
  description:
    "Manage your FINY FASHIONS account, addresses, payments, and orders.",
  path: "/profile",
  noIndex: true,
});

export default function ProfilePage() {
  return <ProfilePageContent />;
}
