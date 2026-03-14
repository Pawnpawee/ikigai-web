import { useCallback, useRef, useState } from "react";
import type { AssetGroup } from "@/app/utils/assetGroups";

const loadedAssetCache = new Set<string>();

const normalizeAssets = (assets: string[]) => {
  return Array.from(new Set(assets.filter(Boolean)));
};

const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    img.onload = () => resolve();
    img.onerror = () => {
      console.warn(`Failed to preload image: ${src}`);
      resolve();
    };
  });
};

const preloadVideo = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const video = document.createElement("video");
    video.src = src;
    video.onloadeddata = () => resolve();
    video.onerror = () => {
      console.warn(`Failed to preload video: ${src}`);
      resolve();
    };
    video.load();
  });
};

const preloadJson = async (src: string): Promise<void> => {
  try {
    await fetch(src);
  } catch (err) {
    console.warn(`Failed to preload JSON: ${src}`, err);
  }
};

const preloadAudio = (src: string): Promise<void> => {
  return new Promise((resolve) => {
    const audio = new Audio();
    audio.src = src;
    audio.oncanplaythrough = () => resolve();
    audio.onerror = () => {
      console.warn(`Failed to preload audio: ${src}`);
      resolve();
    };
    audio.load();
  });
};

const preloadSingleAsset = async (src: string) => {
  if (loadedAssetCache.has(src)) return;

  try {
    if (src.match(/\.(jpg|jpeg|png|gif|webp|svg)$/i)) {
      await preloadImage(src);
    } else if (src.match(/\.(mp4|webm|ogg)$/i)) {
      await preloadVideo(src);
    } else if (src.match(/\.(json)$/i)) {
      await preloadJson(src);
    } else if (src.match(/\.(mp3|wav)$/i)) {
      await preloadAudio(src);
    }
  } catch (error) {
    console.error(`Error loading asset ${src}`, error);
  } finally {
    loadedAssetCache.add(src);
  }
};

export const useAssetPreloader = () => {
  const [loadedCount, setLoadedCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadedGroups, setLoadedGroups] = useState<string[]>([]);
  const loadedGroupIdsRef = useRef<Set<string>>(new Set());
  const loadingGroupIdsRef = useRef<Set<string>>(new Set());

  const preloadAssets = useCallback(async (assets: string[]) => {
    const normalizedAssets = normalizeAssets(assets);
    const pendingAssets = normalizedAssets.filter((src) => {
      return !loadedAssetCache.has(src);
    });

    setTotalCount(normalizedAssets.length);
    setLoadedCount(normalizedAssets.length - pendingAssets.length);

    if (pendingAssets.length === 0) {
      setIsLoaded(true);
      return;
    }

    setIsLoaded(false);

    await Promise.all(
      pendingAssets.map(async (src) => {
        await preloadSingleAsset(src);
        setLoadedCount((prev) => prev + 1);
      }),
    );

    setIsLoaded(true);
  }, []);

  const preloadGroups = useCallback(async (groups: AssetGroup[]) => {
    const nextGroups = groups.filter((group) => {
      return (
        !loadedGroupIdsRef.current.has(group.id) &&
        !loadingGroupIdsRef.current.has(group.id)
      );
    });

    if (nextGroups.length === 0) return;

    nextGroups.forEach((group) => {
      loadingGroupIdsRef.current.add(group.id);
    });

    const nextAssets = normalizeAssets(
      nextGroups.flatMap((group) => {
        return group.assets;
      }),
    ).filter((src) => {
      return !loadedAssetCache.has(src);
    });

    await Promise.all(
      nextAssets.map(async (src) => {
        await preloadSingleAsset(src);
      }),
    );

    nextGroups.forEach((group) => {
      loadingGroupIdsRef.current.delete(group.id);
      loadedGroupIdsRef.current.add(group.id);
    });

    setLoadedGroups(Array.from(loadedGroupIdsRef.current));
  }, []);

  const areGroupsLoaded = useCallback((groupIds: string[]) => {
    return groupIds.every((groupId) => {
      return loadedGroupIdsRef.current.has(groupId);
    });
  }, []);

  const isGroupLoaded = useCallback((groupId: string) => {
    return loadedGroupIdsRef.current.has(groupId);
  }, []);

  return {
    areGroupsLoaded,
    checkAssets: preloadAssets,
    isGroupLoaded,
    isLoaded,
    loadedCount,
    loadedGroups,
    preloadAssets,
    preloadGroups,
    totalCount,
  };
};
