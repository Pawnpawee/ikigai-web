"use client";

import { useEffect, useLayoutEffect, useMemo } from "react";
import LoadingScreen from "@/app/components/reusable/LoadingScreen";
import { useAudio } from "@/app/contexts/AudioContext";
import { useAssetPreloader } from "@/app/hooks/useAssetPreloader";
import { createSceneAssetGroup } from "@/app/utils/assetGroups";
import { getAudioUrl } from "@/utils/cloudinaryUtils";

import IntoDark from "./IntoDark";

export default function IntoDarkPage() {
  const { setBgMusic } = useAudio();
  const { areGroupsLoaded, preloadGroups } = useAssetPreloader();

  const assetGroup = useMemo(
    () =>
      createSceneAssetGroup({
        id: "into-dark",
        extraAssets: [getAudioUrl("Sound/5/mysterious-dark-background.mp3")],
      }),
    [],
  );

  useLayoutEffect(() => {
    if (typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
  }, []);

  //? ตั้งเพลง bg ทุกครั้งที่เข้าหน้า ไม่ว่าจะ mute หรือไม่ เพื่อให้ soundRef ตรงกับหน้าปัจจุบัน
  useEffect(() => {
    setBgMusic(getAudioUrl("Sound/5/mysterious-dark-background.mp3"));
  }, [setBgMusic]);

  useEffect(() => {
    void preloadGroups([assetGroup]);
  }, [assetGroup, preloadGroups]);

  if (!areGroupsLoaded([assetGroup.id]))
    return <LoadingScreen isLoading={true} />;

  return (
    <div>
      <IntoDark />
    </div>
  );
}
