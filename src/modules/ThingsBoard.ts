import axios from 'axios'
import { CreateUser } from '../types/User';

export class ThingsBoard {
  private token: string;
  private refresh_token: string
  // private httpAgent: any
  private URL: string
  private headers: any
  constructor(private host: string, private port: number, private username: string, private password: string, private tls: boolean = false) {
    // this.httpAgent = axios
    this.token = ''
    this.refresh_token = ''
    if (tls) {
      this.URL = `https://${this.host}:${this.port}`
    }
    this.URL = `http://${this.host}:${this.port}`
  }

  async auth() {
    const { data } = await axios.post(`${this.URL}/api/auth/login`, {
      "username": this.username,
      "password": this.password
    })

    this.token = data.token
    this.refresh_token = data.refreshToken

    this.headers = {
      'Authorization': `Bearer ${this.token}`,
      'Content-Type': 'application/json'
    }

    return {
      token: this.token,
      refresh_token: this.refresh_token
    }
  }

  async createUser({ email, firstName, lastName, authority, password, additionalInfo, sendActivationMail }: CreateUser) {
    if (!sendActivationMail) {
      sendActivationMail = false
    }
    const { data } = await axios.post(`${this.URL}/api/user?sendActivationMail=${sendActivationMail}`,
      {
        email,
        authority,
        firstName,
        lastName,
        additionalInfo
      },
      {
        headers: this.headers
      })

    const user_id = String(data.id.id)
    await this.activateUser(user_id, password)
    return data
  }

  async getActivationLink(user_id: string) {
    const { data } = await axios.get(`${this.URL}/api/user/${user_id}/activationLink`, {
      headers: this.headers
    })

    return data
  }

  private async activateUser(user_id: string, password: string) {
    const activationLink = await this.getActivationLink(user_id)

    const index = String(activationLink).search(/activateToken=/)
    const [, token] = activationLink.substring(index).split("=")

    const response = await axios.post(`${this.URL}/api/noauth/activate?sendActivationMail=true`, {
      "activateToken": token,
      "password": password
    },
      {
        headers: this.headers
      }
    )

    const jwtToken = response.data.token
    console.log({ jwtToken });

    return jwtToken
  }
}