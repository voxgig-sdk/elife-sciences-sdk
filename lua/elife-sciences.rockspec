package = "voxgig-sdk-elife-sciences"
version = "0.0-1"
source = {
  url = "git://github.com/voxgig-sdk/elife-sciences-sdk.git"
}
description = {
  summary = "ElifeSciences SDK for Lua",
  license = "MIT"
}
dependencies = {
  "lua >= 5.3",
  "dkjson >= 2.5",
  "dkjson >= 2.5",
}
build = {
  type = "builtin",
  modules = {
    ["elife-sciences_sdk"] = "elife-sciences_sdk.lua",
    ["config"] = "config.lua",
    ["features"] = "features.lua",
  }
}
