class Game{
  constructor (url = "https://refresh.dragonsofmugloar.com") {
    this.url = url
  }

  async start() {
    let res = await this.post("/api/v2/game/start")
    this.gameId = res.gameId
    return res
  }

  async investigateReputation() {
    return this.post("/api/v2/"+this.gameId+"/investigate/reputation")
  }

  async getMessages() {
    return this.get("/api/v2/"+this.gameId+"/messages")
  }

  async solve(adId) {
    return this.post("/api/v2/"+this.gameId+"/solve/" + adId)
  }

  async getShopInventory() {
    return this.get("/api/v2/"+this.gameId+"/shop")
  }

  async buyItem(itemId) {
    return this.post("/api/v2/"+this.gameId+"/shop/buy/" + itemId)
  }

  async post(api, body) {
    return (await fetch(this.url + api, {
      method: 'post',
      headers: { "Content-type": "application/json" },
      body
    })).json()
  }

  async get(api) {
    return (await fetch(this.url + api)).json()
  }

}