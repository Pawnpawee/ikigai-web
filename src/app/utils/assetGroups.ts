import type { SceneItemData } from "@/app/components/reusable/SceneLayer";
import { getImgPath } from "@/utils/cloudinaryUtils";

export interface AssetGroup {
  id: string;
  assets: string[];
}

interface CoverAssetConfig {
  titleImage: string;
  iconImage: string;
}

interface CreateSceneAssetGroupParams {
  id: string;
  items?: SceneItemData[];
  extraAssets?: Array<string | undefined>;
}

interface CreateCoverAssetGroupParams extends CreateSceneAssetGroupParams {
  titleImage: string;
  iconImage: string;
}

const COVER_SHARED_ASSETS = [getImgPath("Scene/Scene6/01/light_blur.webp")];

const dedupeAssets = (assets: Array<string | undefined>): string[] => {
  return Array.from(
    new Set(
      assets.filter((asset): asset is string => {
        return Boolean(asset);
      }),
    ),
  );
};

const collectSceneItemAssets = (
  items: SceneItemData[] = [],
): string[] => {
  return dedupeAssets(
    items.flatMap((item) => {
      return [item.src, item.mobileSrc];
    }),
  );
};

const collectCoverAssets = (
  config: CoverAssetConfig,
  items: SceneItemData[] = [],
): string[] => {
  return dedupeAssets([
    ...COVER_SHARED_ASSETS,
    ...collectSceneItemAssets(items),
    config.titleImage,
    config.iconImage,
  ]);
};

export const createSceneAssetGroup = ({
  id,
  items = [],
  extraAssets = [],
}: CreateSceneAssetGroupParams): AssetGroup => {
  return {
    id,
    assets: dedupeAssets([...collectSceneItemAssets(items), ...extraAssets]),
  };
};

export const createCoverAssetGroup = ({
  id,
  items = [],
  titleImage,
  iconImage,
  extraAssets = [],
}: CreateCoverAssetGroupParams): AssetGroup => {
  return {
    id,
    assets: dedupeAssets([
      ...collectCoverAssets({ titleImage, iconImage }, items),
      ...extraAssets,
    ]),
  };
};
