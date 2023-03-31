import {
  Approval as ApprovalEvent,
  ApprovalForAll as ApprovalForAllEvent,
  Paused as PausedEvent,
  Transfer as TransferEvent,
  Unpaused as UnpausedEvent,
  eventAddedOwner as eventAddedOwnerEvent,
  eventCreateCard as eventCreateCardEvent,
  eventRemovedOwner as eventRemovedOwnerEvent,
  eventSetMainOwner as eventSetMainOwnerEvent
} from "../generated/CARD/CARD"
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
} from "../generated/schema"

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.approved = event.params.approved
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleApprovalForAll(event: ApprovalForAllEvent): void {
  let entity = new ApprovalForAll(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.owner = event.params.owner
  entity.operator = event.params.operator
  entity.approved = event.params.approved

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handlePaused(event: PausedEvent): void {
  let entity = new Paused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.tokenId = event.params.tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleUnpaused(event: UnpausedEvent): void {
  let entity = new Unpaused(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.account = event.params.account

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleeventAddedOwner(event: eventAddedOwnerEvent): void {
  let entity = new eventAddedOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleeventCreateCard(event: eventCreateCardEvent): void {
  let entity = new eventCreateCard(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity._toAddress = event.params._toAddress
  entity._tokenId = event.params._tokenId

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleeventRemovedOwner(event: eventRemovedOwnerEvent): void {
  let entity = new eventRemovedOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.removedOwner = event.params.removedOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}

export function handleeventSetMainOwner(event: eventSetMainOwnerEvent): void {
  let entity = new eventSetMainOwner(
    event.transaction.hash.concatI32(event.logIndex.toI32())
  )
  entity.previousOwner = event.params.previousOwner
  entity.newOwner = event.params.newOwner

  entity.blockNumber = event.block.number
  entity.blockTimestamp = event.block.timestamp
  entity.transactionHash = event.transaction.hash

  entity.save()
}
