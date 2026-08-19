import { describe, expect, it } from "vitest";

import type { DocGroup, DocumentationConfig } from "../src/output/documentationJson";
import { checkApiWiring, endpointRef, wireApiReference } from "../src/output/openapi";

function config(): DocumentationConfig {
  return {
    name: "Capillary",
    initialRoute: "api-reference/users/get-user",
    colors: {
      light: { brand: "#3143e3", heading: "#1a1a1a", text: "#374151" },
      dark: { brand: "#85a1ff", heading: "#f2f2f2", text: "#c1c1c1" },
    },
    navigation: {
      tabs: [
        {
          tab: "API Reference",
          groups: [
            {
              group: "Users",
              pages: [
                { title: "Get User Details", path: "api-reference/users/get-user" },
                { title: "Create User", path: "api-reference/users/post-user" },
              ],
            },
          ],
        },
      ],
    },
  };
}

const SPEC = "api-reference/openapi.yaml";

function usersGroup(built: DocumentationConfig): DocGroup {
  const [tab] = built.navigation.tabs;
  if (!tab || !("groups" in tab) || !tab.groups[0]) throw new Error("no group");
  return tab.groups[0];
}

describe("5.2 endpoint references", () => {
  it("uppercases the method and uses exactly one space", () => {
    expect(endpointRef({ method: "get", path: "/users/{id}" }).ref).toBe("GET /users/{id}");
  });

  it("refuses a path that cannot match the spec", () => {
    const { issue } = endpointRef({ method: "GET", path: "users/{id}" });

    expect(issue?.level).toBe("blocker");
  });

  it("refuses something that is not an HTTP method", () => {
    expect(endpointRef({ method: "FETCH", path: "/users" }).issue?.level).toBe("blocker");
  });
});

describe("5.2 page-level wiring", () => {
  it("writes method, openapi and openapi-mode onto the page", () => {
    const { config: built, wired } = wireApiReference(config(), {
      spec: SPEC,
      endpoints: { "api-reference/users/get-user": { method: "get", path: "/users/{id}" } },
    });

    const [page] = usersGroup(built).pages;

    expect(wired).toBe(1);
    expect(page).toMatchObject({
      method: "GET",
      openapi: "api-reference/openapi.yaml GET /users/{id}",
      "openapi-mode": "custom",
    });
  });

  it('defaults to "custom", so hand-written prose survives [PIT Phase 2]', () => {
    const { config: built } = wireApiReference(config(), {
      spec: SPEC,
      endpoints: { "api-reference/users/get-user": { method: "GET", path: "/users/{id}" } },
    });

    expect(usersGroup(built).pages[0]).toMatchObject({ "openapi-mode": "custom" });
  });

  it("reports an endpoint whose page is not in the navigation, rather than inventing one", () => {
    const { issues, wired } = wireApiReference(config(), {
      spec: SPEC,
      endpoints: { "api-reference/users/delete-user": { method: "DELETE", path: "/users/{id}" } },
    });

    expect(wired).toBe(0);
    expect(issues[0]?.level).toBe("blocker");
    expect(issues[0]?.detail).toMatch(/PIT Phase 7/);
  });
});

describe("5.2 group-level wiring", () => {
  it("hangs the spec and hidden-apis on the named group", () => {
    const { config: built } = wireApiReference(config(), {
      spec: SPEC,
      endpoints: {},
      group: { name: "Users", hidden: [{ method: "delete", path: "/users/{id}" }] },
    });

    expect(usersGroup(built)).toMatchObject({
      openapi: SPEC,
      "hidden-apis": ["DELETE /users/{id}"],
    });
  });

  it("reports a group that does not exist", () => {
    const { issues } = wireApiReference(config(), { spec: SPEC, endpoints: {}, group: { name: "Orders" } });

    expect(issues[0]?.level).toBe("blocker");
  });
});

describe("5.2 checking a config that a human edited", () => {
  it("catches a lowercase method in hidden-apis, which silently fails to match", () => {
    const built = config();
    const group = usersGroup(built);
    group.openapi = SPEC;
    group["hidden-apis"] = ["get /users/{id}", "GET/users/{id}", "GET /users/{id}"];

    const issues = checkApiWiring(built);

    expect(issues.filter((issue) => issue.level === "blocker")).toHaveLength(2);
  });

  it("catches a page binding that is not \"<spec> METHOD /endpoint\"", () => {
    const built = config();
    const [page] = usersGroup(built).pages;
    if (page && "path" in page) page.openapi = "api-reference/openapi.yaml get /users/{id}";

    expect(checkApiWiring(built)[0]?.detail).toMatch(/playground will not appear/);
  });

  it("catches a badge that disagrees with the binding", () => {
    const built = config();
    const [page] = usersGroup(built).pages;
    if (page && "path" in page) {
      page.method = "POST";
      page.openapi = `${SPEC} GET /users/{id}`;
    }

    expect(checkApiWiring(built)[0]?.detail).toMatch(/badge says POST/);
  });

  it("passes a correctly wired config", () => {
    const { config: built } = wireApiReference(config(), {
      spec: SPEC,
      endpoints: {
        "api-reference/users/get-user": { method: "GET", path: "/users/{id}" },
        "api-reference/users/post-user": { method: "POST", path: "/users" },
      },
      group: { name: "Users", hidden: [{ method: "DELETE", path: "/users/{id}" }] },
    });

    expect(checkApiWiring(built)).toEqual([]);
  });
});
