import { newMockEvent } from "matchstick-as"
import { ethereum, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  Approval,
  ApprovalForAll,
  Paused,
  Transfer,
  Unpaused,
  eventAddedOwner,
  eventCreateCard,
  eventRemovedOwner,
  eventSetMainOwner
} from "../generated/CARD/CARD"

export function createApprovalEvent(
  owner: Address,
  approved: Address,
  tokenId: BigInt
): Approval {
  let approvalEvent = changetype<Approval>(newMockEvent())

  approvalEvent.parameters = new Array()

  approvalEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromAddress(approved))
  )
  approvalEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return approvalEvent
}

export function createApprovalForAllEvent(
  owner: Address,
  operator: Address,
  approved: boolean
): ApprovalForAll {
  let approvalForAllEvent = changetype<ApprovalForAll>(newMockEvent())

  approvalForAllEvent.parameters = new Array()

  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("owner", ethereum.Value.fromAddress(owner))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("operator", ethereum.Value.fromAddress(operator))
  )
  approvalForAllEvent.parameters.push(
    new ethereum.EventParam("approved", ethereum.Value.fromBoolean(approved))
  )

  return approvalForAllEvent
}

export function createPausedEvent(account: Address): Paused {
  let pausedEvent = changetype<Paused>(newMockEvent())

  pausedEvent.parameters = new Array()

  pausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return pausedEvent
}

export function createTransferEvent(
  from: Address,
  to: Address,
  tokenId: BigInt
): Transfer {
  let transferEvent = changetype<Transfer>(newMockEvent())

  transferEvent.parameters = new Array()

  transferEvent.parameters.push(
    new ethereum.EventParam("from", ethereum.Value.fromAddress(from))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam("to", ethereum.Value.fromAddress(to))
  )
  transferEvent.parameters.push(
    new ethereum.EventParam(
      "tokenId",
      ethereum.Value.fromUnsignedBigInt(tokenId)
    )
  )

  return transferEvent
}

export function createUnpausedEvent(account: Address): Unpaused {
  let unpausedEvent = changetype<Unpaused>(newMockEvent())

  unpausedEvent.parameters = new Array()

  unpausedEvent.parameters.push(
    new ethereum.EventParam("account", ethereum.Value.fromAddress(account))
  )

  return unpausedEvent
}

export function createeventAddedOwnerEvent(newOwner: Address): eventAddedOwner {
  let eventAddedOwnerEvent = changetype<eventAddedOwner>(newMockEvent())

  eventAddedOwnerEvent.parameters = new Array()

  eventAddedOwnerEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return eventAddedOwnerEvent
}

export function createeventCreateCardEvent(
  _toAddress: Address,
  _tokenId: BigInt
): eventCreateCard {
  let eventCreateCardEvent = changetype<eventCreateCard>(newMockEvent())

  eventCreateCardEvent.parameters = new Array()

  eventCreateCardEvent.parameters.push(
    new ethereum.EventParam(
      "_toAddress",
      ethereum.Value.fromAddress(_toAddress)
    )
  )
  eventCreateCardEvent.parameters.push(
    new ethereum.EventParam(
      "_tokenId",
      ethereum.Value.fromUnsignedBigInt(_tokenId)
    )
  )

  return eventCreateCardEvent
}

export function createeventRemovedOwnerEvent(
  removedOwner: Address
): eventRemovedOwner {
  let eventRemovedOwnerEvent = changetype<eventRemovedOwner>(newMockEvent())

  eventRemovedOwnerEvent.parameters = new Array()

  eventRemovedOwnerEvent.parameters.push(
    new ethereum.EventParam(
      "removedOwner",
      ethereum.Value.fromAddress(removedOwner)
    )
  )

  return eventRemovedOwnerEvent
}

export function createeventSetMainOwnerEvent(
  previousOwner: Address,
  newOwner: Address
): eventSetMainOwner {
  let eventSetMainOwnerEvent = changetype<eventSetMainOwner>(newMockEvent())

  eventSetMainOwnerEvent.parameters = new Array()

  eventSetMainOwnerEvent.parameters.push(
    new ethereum.EventParam(
      "previousOwner",
      ethereum.Value.fromAddress(previousOwner)
    )
  )
  eventSetMainOwnerEvent.parameters.push(
    new ethereum.EventParam("newOwner", ethereum.Value.fromAddress(newOwner))
  )

  return eventSetMainOwnerEvent
}
