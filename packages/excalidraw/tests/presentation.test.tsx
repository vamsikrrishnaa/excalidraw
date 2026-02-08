import type { FileId } from "@excalidraw/element/types";

import { restoreElements } from "../data/restore";

describe("presentation legacy migration", () => {
  it("should migrate legacy presentation elements to embeddable customData.kind=presentation", () => {
    const legacyFileId = "legacy-file" as FileId;

    const restored = restoreElements(
      [
        {
          id: "legacy-presentation",
          type: "presentation",
          x: 0,
          y: 0,
          width: 100,
          height: 50,
          fileId: legacyFileId,
          status: "pending",
          version: 1,
          versionNonce: 1,
          isDeleted: false,
          groupIds: [],
          frameId: null,
          angle: 0,
          fillStyle: "solid",
          strokeWidth: 1,
          strokeStyle: "solid",
          roughness: 0,
          opacity: 100,
          seed: 1,
          strokeColor: "#000000",
          backgroundColor: "transparent",
          boundElements: null,
          updated: 1,
          link: null,
          locked: false,
        } as any,
      ],
      null,
    );

    expect(restored[0]).toEqual(
      expect.objectContaining({
        type: "embeddable",
        link: "about:blank",
        customData: expect.objectContaining({
          kind: "presentation",
          presentation: expect.objectContaining({
            fileId: legacyFileId,
            status: "pending",
          }),
        }),
      }),
    );

    expect((restored[0] as any).fileId).toBeUndefined();
    expect((restored[0] as any).status).toBeUndefined();
  });
});
