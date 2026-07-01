import { ProfilePageContent } from "@/components/profile/profile-page-content";
import { createPageMetadata } from "@/lib/metadata";
import { checkoutCopy } from "@/constants/checkout";

export const metadata = createPageMetadata(
  checkoutCopy.profileTitle,
  "Manage your FINY FASHIONS account, addresses, payments, and orders."
);

export default function ProfilePage() {
  return <ProfilePageContent />;
}
