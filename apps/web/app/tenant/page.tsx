import { headers } from "next/headers";

export default async function TenantPage() {
  const headerStore = await headers();

  const tenantId = headerStore.get("x-tenant-id");
  const tenantName = headerStore.get("x-tenant-name");

  return (
    <div className="p-8">
      <h1>Tenant Test</h1>

      <p>Tenant ID: {tenantId}</p>
      <p>Tenant Name: {tenantName}</p>
    </div>
  );
}