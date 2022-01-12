/* eslint-disable prefer-const */
import { Address, BigInt } from "@graphprotocol/graph-ts";
import { IERC721 } from "../../generated/AlmanackERC721NFTMarketV1/IERC721";
import { AlmanackCollectibles } from "../../generated/AlmanackERC721NFTMarketV1/AlmanackCollectibles";

export function fetchName(collectionAddress: Address): string {
  let contract = IERC721.bind(collectionAddress);

  let nameResult = contract.try_name();
  if (!nameResult.reverted) {
    return nameResult.value;
  }

  return "unknown";
}

export function fetchSymbol(collectionAddress: Address): string {
  let contract = IERC721.bind(collectionAddress);

  let symbolResult = contract.try_symbol();
  if (!symbolResult.reverted) {
    return symbolResult.value;
  }

  return "unknown";
}

export function fetchTokenURI(collectionAddress: Address, tokenId: BigInt): string | null {
  let contract = IERC721.bind(collectionAddress);

  let tokenURIResult = contract.try_tokenURI(tokenId);
  if (!tokenURIResult.reverted) {
    return tokenURIResult.value;
  }

  return null;
}

export function fetchCollectibleId(collectionAddress: Address, tokenId: BigInt): BigInt | null {
  let contract = AlmanackCollectibles.bind(collectionAddress);

  let collectibleIdResult = contract.try_getCollectibleId(tokenId);
  if (!collectibleIdResult.reverted) {
    return BigInt.fromI32(collectibleIdResult.value);
  }

  return null;
}
