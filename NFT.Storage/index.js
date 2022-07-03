import { NFTStorage, File } from 'nft.storage'
import mime from 'mime'
import fs from 'fs'
import path from 'path'

const NFT_STORAGE_KEY = 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX'

async function storeNFT(imagePath, name, description) {
    const image = await fileFromPath(imagePath)
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY })
    return nftstorage.store({
        image,
        name,
        description,
    })
}

async function fileFromPath(filePath) {
    const content = await fs.promises.readFile(filePath)
    const type = mime.getType(filePath)
    return new File([content], path.basename(filePath), { type })
}

async function main() {
    const [imagePath, name, description] = ["logo.png", "PolkaNFT", "PolkaNFT Test Token"]
    const result = await storeNFT(imagePath, name, description)
    console.log(result)
}

main()
  .catch(err => {
      console.error(err)
      process.exit(1)
  })