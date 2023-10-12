import { AppDispatch } from "../../store";
import { showRTCStatus } from "../../store/slices/common";

/* eslint-disable @typescript-eslint/no-explicit-any */
export class WebRTCClient {
  private peerConnection: RTCPeerConnection;
  private dataChannel: RTCDataChannel | null = null;
  public iceCandidate: RTCSessionDescription | null = null;
  private dispatch?: AppDispatch;

  constructor(configutation: RTCConfiguration) {
    this.peerConnection = new RTCPeerConnection(configutation);
    this.setupDataChannel();

    this.peerConnection.onicecandidate = () => {
      console.log(
        "New Ice Candidate: ",
        JSON.stringify(this.peerConnection.localDescription)
      );

      this.iceCandidate = this.peerConnection.localDescription;
    };

    this.peerConnection.ondatachannel = (ev) => {
      console.log(ev);

      ev.channel.onmessage = (e) => {
        console.log("New message from client: ", JSON.parse(e.data));
      };
    };
  }

  private setupDataChannel() {
    this.dataChannel = this.peerConnection.createDataChannel("channel");

    this.dataChannel.onopen = () => {
      this.dispatch?.(showRTCStatus("connected"));
      console.log("Data channel is open and ready for communication");
    };
  }

  public async createOffer(): Promise<string> {
    return this.peerConnection
      .createOffer()
      .then((offer) => {
        return this.peerConnection.setLocalDescription(offer);
      })
      .then(() => {
        return JSON.stringify(this.peerConnection.localDescription);
      });
  }

  public async createAnswer(
    remoteDescription: RTCSessionDescription
  ): Promise<string> {
    return this.peerConnection
      .setRemoteDescription(remoteDescription)
      .then(() => {
        return this.peerConnection.createAnswer();
      })
      .then((answer) => {
        this.peerConnection.setLocalDescription(answer);
        return JSON.stringify(answer);
      });
  }

  public send(data: string) {
    if (this.dataChannel) {
      this.dataChannel.send(data);
    } else {
      console.log("Data channel is not open");
    }
  }

  public setAsnwer(answer: string) {
    this.peerConnection.setRemoteDescription(JSON.parse(answer));
  }

  public setConfiguration(dispatch: AppDispatch) {
    this.dispatch = dispatch;
  }
}

const configuration: RTCConfiguration = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export const rtcConnection = new WebRTCClient(configuration);
