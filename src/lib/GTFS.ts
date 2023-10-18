import { encodeMessage, decodeMessage, message, enumeration } from 'protons-runtime'
import type { Codec } from 'protons-runtime'
import type { Uint8ArrayList } from 'uint8arraylist'

export interface transit_realtime { }

export namespace transit_realtime {
	export interface FeedMessage {
		header?: transit_realtime.FeedHeader
		entity: transit_realtime.FeedEntity[]
	}

	export namespace FeedMessage {
		let _codec: Codec<FeedMessage>

		export const codec = (): Codec<FeedMessage> => {
			if (_codec == null) {
				_codec = message<FeedMessage>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if (obj.header != null) {
						w.uint32(10)
						transit_realtime.FeedHeader.codec().encode(obj.header, w)
					}

					if (obj.entity != null) {
						for (const value of obj.entity) {
							w.uint32(18)
							transit_realtime.FeedEntity.codec().encode(value, w)
						}
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						entity: []
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.header = transit_realtime.FeedHeader.codec().decode(reader, reader.uint32())
								break
							case 2:
								obj.entity.push(transit_realtime.FeedEntity.codec().decode(reader, reader.uint32()))
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<FeedMessage>): Uint8Array => {
			return encodeMessage(obj, FeedMessage.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): FeedMessage => {
			return decodeMessage(buf, FeedMessage.codec())
		}
	}

	export interface FeedHeader {
		gtfsRealtimeVersion: string
		incrementality: transit_realtime.FeedHeader.Incrementality
		timestamp: bigint
	}

	export namespace FeedHeader {
		export enum Incrementality {
			FULL_DATASET = 'FULL_DATASET',
			DIFFERENTIAL = 'DIFFERENTIAL'
		}

		enum __IncrementalityValues {
			FULL_DATASET = 0,
			DIFFERENTIAL = 1
		}

		export namespace Incrementality {
			export const codec = (): Codec<Incrementality> => {
				return enumeration<Incrementality>(__IncrementalityValues)
			}
		}

		let _codec: Codec<FeedHeader>

		export const codec = (): Codec<FeedHeader> => {
			if (_codec == null) {
				_codec = message<FeedHeader>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if ((obj.gtfsRealtimeVersion != null && obj.gtfsRealtimeVersion !== '')) {
						w.uint32(10)
						w.string(obj.gtfsRealtimeVersion)
					}

					if (obj.incrementality != null && __IncrementalityValues[obj.incrementality] !== 0) {
						w.uint32(16)
						transit_realtime.FeedHeader.Incrementality.codec().encode(obj.incrementality, w)
					}

					if ((obj.timestamp != null && obj.timestamp !== 0n)) {
						w.uint32(24)
						w.uint64(obj.timestamp)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						gtfsRealtimeVersion: '',
						incrementality: Incrementality.FULL_DATASET,
						timestamp: 0n
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.gtfsRealtimeVersion = reader.string()
								break
							case 2:
								obj.incrementality = transit_realtime.FeedHeader.Incrementality.codec().decode(reader)
								break
							case 3:
								obj.timestamp = reader.uint64()
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<FeedHeader>): Uint8Array => {
			return encodeMessage(obj, FeedHeader.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): FeedHeader => {
			return decodeMessage(buf, FeedHeader.codec())
		}
	}

	export interface FeedEntity {
		id: string
		isDeleted: boolean
		tripUpdate?: transit_realtime.TripUpdate
		vehicle?: transit_realtime.VehiclePosition
		alert?: transit_realtime.Alert
	}

	export namespace FeedEntity {
		let _codec: Codec<FeedEntity>

		export const codec = (): Codec<FeedEntity> => {
			if (_codec == null) {
				_codec = message<FeedEntity>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if ((obj.id != null && obj.id !== '')) {
						w.uint32(10)
						w.string(obj.id)
					}

					if ((obj.isDeleted != null && obj.isDeleted !== false)) {
						w.uint32(16)
						w.bool(obj.isDeleted)
					}

					if (obj.tripUpdate != null) {
						w.uint32(26)
						transit_realtime.TripUpdate.codec().encode(obj.tripUpdate, w)
					}

					if (obj.vehicle != null) {
						w.uint32(34)
						transit_realtime.VehiclePosition.codec().encode(obj.vehicle, w)
					}

					if (obj.alert != null) {
						w.uint32(42)
						transit_realtime.Alert.codec().encode(obj.alert, w)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						id: '',
						isDeleted: false
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.id = reader.string()
								break
							case 2:
								obj.isDeleted = reader.bool()
								break
							case 3:
								obj.tripUpdate = transit_realtime.TripUpdate.codec().decode(reader, reader.uint32())
								break
							case 4:
								obj.vehicle = transit_realtime.VehiclePosition.codec().decode(reader, reader.uint32())
								break
							case 5:
								obj.alert = transit_realtime.Alert.codec().decode(reader, reader.uint32())
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<FeedEntity>): Uint8Array => {
			return encodeMessage(obj, FeedEntity.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): FeedEntity => {
			return decodeMessage(buf, FeedEntity.codec())
		}
	}

	export interface TripUpdate {
		trip?: transit_realtime.TripDescriptor
		vehicle?: transit_realtime.VehicleDescriptor
		stopTimeUpdate: transit_realtime.TripUpdate.StopTimeUpdate[]
		timestamp: bigint
		delay: number
	}

	export namespace TripUpdate {
		export interface StopTimeEvent {
			delay: number
			time: bigint
			uncertainty: number
		}

		export namespace StopTimeEvent {
			let _codec: Codec<StopTimeEvent>

			export const codec = (): Codec<StopTimeEvent> => {
				if (_codec == null) {
					_codec = message<StopTimeEvent>((obj, w, opts = {}) => {
						if (opts.lengthDelimited !== false) {
							w.fork()
						}

						if ((obj.delay != null && obj.delay !== 0)) {
							w.uint32(8)
							w.int32(obj.delay)
						}

						if ((obj.time != null && obj.time !== 0n)) {
							w.uint32(16)
							w.int64(obj.time)
						}

						if ((obj.uncertainty != null && obj.uncertainty !== 0)) {
							w.uint32(24)
							w.int32(obj.uncertainty)
						}

						if (opts.lengthDelimited !== false) {
							w.ldelim()
						}
					}, (reader, length) => {
						const obj: any = {
							delay: 0,
							time: 0n,
							uncertainty: 0
						}

						const end = length == null ? reader.len : reader.pos + length

						while (reader.pos < end) {
							const tag = reader.uint32()

							switch (tag >>> 3) {
								case 1:
									obj.delay = reader.int32()
									break
								case 2:
									obj.time = reader.int64()
									break
								case 3:
									obj.uncertainty = reader.int32()
									break
								default:
									reader.skipType(tag & 7)
									break
							}
						}

						return obj
					})
				}

				return _codec
			}

			export const encode = (obj: Partial<StopTimeEvent>): Uint8Array => {
				return encodeMessage(obj, StopTimeEvent.codec())
			}

			export const decode = (buf: Uint8Array | Uint8ArrayList): StopTimeEvent => {
				return decodeMessage(buf, StopTimeEvent.codec())
			}
		}

		export interface StopTimeUpdate {
			stopSequence: number
			stopId: string
			arrival?: transit_realtime.TripUpdate.StopTimeEvent
			departure?: transit_realtime.TripUpdate.StopTimeEvent
			scheduleRelationship: transit_realtime.TripUpdate.StopTimeUpdate.ScheduleRelationship
		}

		export namespace StopTimeUpdate {
			export enum ScheduleRelationship {
				SCHEDULED = 'SCHEDULED',
				SKIPPED = 'SKIPPED',
				NO_DATA = 'NO_DATA'
			}

			enum __ScheduleRelationshipValues {
				SCHEDULED = 0,
				SKIPPED = 1,
				NO_DATA = 2
			}

			export namespace ScheduleRelationship {
				export const codec = (): Codec<ScheduleRelationship> => {
					return enumeration<ScheduleRelationship>(__ScheduleRelationshipValues)
				}
			}

			let _codec: Codec<StopTimeUpdate>

			export const codec = (): Codec<StopTimeUpdate> => {
				if (_codec == null) {
					_codec = message<StopTimeUpdate>((obj, w, opts = {}) => {
						if (opts.lengthDelimited !== false) {
							w.fork()
						}

						if ((obj.stopSequence != null && obj.stopSequence !== 0)) {
							w.uint32(8)
							w.uint32(obj.stopSequence)
						}

						if ((obj.stopId != null && obj.stopId !== '')) {
							w.uint32(34)
							w.string(obj.stopId)
						}

						if (obj.arrival != null) {
							w.uint32(18)
							transit_realtime.TripUpdate.StopTimeEvent.codec().encode(obj.arrival, w)
						}

						if (obj.departure != null) {
							w.uint32(26)
							transit_realtime.TripUpdate.StopTimeEvent.codec().encode(obj.departure, w)
						}

						if (obj.scheduleRelationship != null && __ScheduleRelationshipValues[obj.scheduleRelationship] !== 0) {
							w.uint32(40)
							transit_realtime.TripUpdate.StopTimeUpdate.ScheduleRelationship.codec().encode(obj.scheduleRelationship, w)
						}

						if (opts.lengthDelimited !== false) {
							w.ldelim()
						}
					}, (reader, length) => {
						const obj: any = {
							stopSequence: 0,
							stopId: '',
							scheduleRelationship: ScheduleRelationship.SCHEDULED
						}

						const end = length == null ? reader.len : reader.pos + length

						while (reader.pos < end) {
							const tag = reader.uint32()

							switch (tag >>> 3) {
								case 1:
									obj.stopSequence = reader.uint32()
									break
								case 4:
									obj.stopId = reader.string()
									break
								case 2:
									obj.arrival = transit_realtime.TripUpdate.StopTimeEvent.codec().decode(reader, reader.uint32())
									break
								case 3:
									obj.departure = transit_realtime.TripUpdate.StopTimeEvent.codec().decode(reader, reader.uint32())
									break
								case 5:
									obj.scheduleRelationship = transit_realtime.TripUpdate.StopTimeUpdate.ScheduleRelationship.codec().decode(reader)
									break
								default:
									reader.skipType(tag & 7)
									break
							}
						}

						return obj
					})
				}

				return _codec
			}

			export const encode = (obj: Partial<StopTimeUpdate>): Uint8Array => {
				return encodeMessage(obj, StopTimeUpdate.codec())
			}

			export const decode = (buf: Uint8Array | Uint8ArrayList): StopTimeUpdate => {
				return decodeMessage(buf, StopTimeUpdate.codec())
			}
		}

		let _codec: Codec<TripUpdate>

		export const codec = (): Codec<TripUpdate> => {
			if (_codec == null) {
				_codec = message<TripUpdate>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if (obj.trip != null) {
						w.uint32(10)
						transit_realtime.TripDescriptor.codec().encode(obj.trip, w)
					}

					if (obj.vehicle != null) {
						w.uint32(26)
						transit_realtime.VehicleDescriptor.codec().encode(obj.vehicle, w)
					}

					if (obj.stopTimeUpdate != null) {
						for (const value of obj.stopTimeUpdate) {
							w.uint32(18)
							transit_realtime.TripUpdate.StopTimeUpdate.codec().encode(value, w)
						}
					}

					if ((obj.timestamp != null && obj.timestamp !== 0n)) {
						w.uint32(32)
						w.uint64(obj.timestamp)
					}

					if ((obj.delay != null && obj.delay !== 0)) {
						w.uint32(40)
						w.int32(obj.delay)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						stopTimeUpdate: [],
						timestamp: 0n,
						delay: 0
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.trip = transit_realtime.TripDescriptor.codec().decode(reader, reader.uint32())
								break
							case 3:
								obj.vehicle = transit_realtime.VehicleDescriptor.codec().decode(reader, reader.uint32())
								break
							case 2:
								obj.stopTimeUpdate.push(transit_realtime.TripUpdate.StopTimeUpdate.codec().decode(reader, reader.uint32()))
								break
							case 4:
								obj.timestamp = reader.uint64()
								break
							case 5:
								obj.delay = reader.int32()
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<TripUpdate>): Uint8Array => {
			return encodeMessage(obj, TripUpdate.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): TripUpdate => {
			return decodeMessage(buf, TripUpdate.codec())
		}
	}

	export interface VehiclePosition {
		trip?: transit_realtime.TripDescriptor
		vehicle?: transit_realtime.VehicleDescriptor
		position?: transit_realtime.Position
		currentStopSequence: number
		stopId: string
		currentStatus: transit_realtime.VehiclePosition.VehicleStopStatus
		timestamp: bigint
		congestionLevel: transit_realtime.VehiclePosition.CongestionLevel
		occupancyStatus: transit_realtime.VehiclePosition.OccupancyStatus
	}

	export namespace VehiclePosition {
		export enum VehicleStopStatus {
			INCOMING_AT = 'INCOMING_AT',
			STOPPED_AT = 'STOPPED_AT',
			IN_TRANSIT_TO = 'IN_TRANSIT_TO'
		}

		enum __VehicleStopStatusValues {
			INCOMING_AT = 0,
			STOPPED_AT = 1,
			IN_TRANSIT_TO = 2
		}

		export namespace VehicleStopStatus {
			export const codec = (): Codec<VehicleStopStatus> => {
				return enumeration<VehicleStopStatus>(__VehicleStopStatusValues)
			}
		}

		export enum CongestionLevel {
			UNKNOWN_CONGESTION_LEVEL = 'UNKNOWN_CONGESTION_LEVEL',
			RUNNING_SMOOTHLY = 'RUNNING_SMOOTHLY',
			STOP_AND_GO = 'STOP_AND_GO',
			CONGESTION = 'CONGESTION',
			SEVERE_CONGESTION = 'SEVERE_CONGESTION'
		}

		enum __CongestionLevelValues {
			UNKNOWN_CONGESTION_LEVEL = 0,
			RUNNING_SMOOTHLY = 1,
			STOP_AND_GO = 2,
			CONGESTION = 3,
			SEVERE_CONGESTION = 4
		}

		export namespace CongestionLevel {
			export const codec = (): Codec<CongestionLevel> => {
				return enumeration<CongestionLevel>(__CongestionLevelValues)
			}
		}

		export enum OccupancyStatus {
			EMPTY = 'EMPTY',
			MANY_SEATS_AVAILABLE = 'MANY_SEATS_AVAILABLE',
			FEW_SEATS_AVAILABLE = 'FEW_SEATS_AVAILABLE',
			STANDING_ROOM_ONLY = 'STANDING_ROOM_ONLY',
			CRUSHED_STANDING_ROOM_ONLY = 'CRUSHED_STANDING_ROOM_ONLY',
			FULL = 'FULL',
			NOT_ACCEPTING_PASSENGERS = 'NOT_ACCEPTING_PASSENGERS'
		}

		enum __OccupancyStatusValues {
			EMPTY = 0,
			MANY_SEATS_AVAILABLE = 1,
			FEW_SEATS_AVAILABLE = 2,
			STANDING_ROOM_ONLY = 3,
			CRUSHED_STANDING_ROOM_ONLY = 4,
			FULL = 5,
			NOT_ACCEPTING_PASSENGERS = 6
		}

		export namespace OccupancyStatus {
			export const codec = (): Codec<OccupancyStatus> => {
				return enumeration<OccupancyStatus>(__OccupancyStatusValues)
			}
		}

		let _codec: Codec<VehiclePosition>

		export const codec = (): Codec<VehiclePosition> => {
			if (_codec == null) {
				_codec = message<VehiclePosition>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if (obj.trip != null) {
						w.uint32(10)
						transit_realtime.TripDescriptor.codec().encode(obj.trip, w)
					}

					if (obj.vehicle != null) {
						w.uint32(66)
						transit_realtime.VehicleDescriptor.codec().encode(obj.vehicle, w)
					}

					if (obj.position != null) {
						w.uint32(18)
						transit_realtime.Position.codec().encode(obj.position, w)
					}

					if ((obj.currentStopSequence != null && obj.currentStopSequence !== 0)) {
						w.uint32(24)
						w.uint32(obj.currentStopSequence)
					}

					if ((obj.stopId != null && obj.stopId !== '')) {
						w.uint32(58)
						w.string(obj.stopId)
					}

					if (obj.currentStatus != null && __VehicleStopStatusValues[obj.currentStatus] !== 0) {
						w.uint32(32)
						transit_realtime.VehiclePosition.VehicleStopStatus.codec().encode(obj.currentStatus, w)
					}

					if ((obj.timestamp != null && obj.timestamp !== 0n)) {
						w.uint32(40)
						w.uint64(obj.timestamp)
					}

					if (obj.congestionLevel != null && __CongestionLevelValues[obj.congestionLevel] !== 0) {
						w.uint32(48)
						transit_realtime.VehiclePosition.CongestionLevel.codec().encode(obj.congestionLevel, w)
					}

					if (obj.occupancyStatus != null && __OccupancyStatusValues[obj.occupancyStatus] !== 0) {
						w.uint32(72)
						transit_realtime.VehiclePosition.OccupancyStatus.codec().encode(obj.occupancyStatus, w)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						currentStopSequence: 0,
						stopId: '',
						currentStatus: VehicleStopStatus.INCOMING_AT,
						timestamp: 0n,
						congestionLevel: CongestionLevel.UNKNOWN_CONGESTION_LEVEL,
						occupancyStatus: OccupancyStatus.EMPTY
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.trip = transit_realtime.TripDescriptor.codec().decode(reader, reader.uint32())
								break
							case 8:
								obj.vehicle = transit_realtime.VehicleDescriptor.codec().decode(reader, reader.uint32())
								break
							case 2:
								obj.position = transit_realtime.Position.codec().decode(reader, reader.uint32())
								break
							case 3:
								obj.currentStopSequence = reader.uint32()
								break
							case 7:
								obj.stopId = reader.string()
								break
							case 4:
								obj.currentStatus = transit_realtime.VehiclePosition.VehicleStopStatus.codec().decode(reader)
								break
							case 5:
								obj.timestamp = reader.uint64()
								break
							case 6:
								obj.congestionLevel = transit_realtime.VehiclePosition.CongestionLevel.codec().decode(reader)
								break
							case 9:
								obj.occupancyStatus = transit_realtime.VehiclePosition.OccupancyStatus.codec().decode(reader)
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<VehiclePosition>): Uint8Array => {
			return encodeMessage(obj, VehiclePosition.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): VehiclePosition => {
			return decodeMessage(buf, VehiclePosition.codec())
		}
	}

	export interface Alert {
		activePeriod: transit_realtime.TimeRange[]
		informedEntity: transit_realtime.EntitySelector[]
		cause: transit_realtime.Alert.Cause
		effect: transit_realtime.Alert.Effect
		url?: transit_realtime.TranslatedString
		headerText?: transit_realtime.TranslatedString
		descriptionText?: transit_realtime.TranslatedString
	}

	export namespace Alert {
		export enum Cause {
			PROTO3_DEFAULT_CAUSE = 'PROTO3_DEFAULT_CAUSE',
			UNKNOWN_CAUSE = 'UNKNOWN_CAUSE',
			OTHER_CAUSE = 'OTHER_CAUSE',
			TECHNICAL_PROBLEM = 'TECHNICAL_PROBLEM',
			STRIKE = 'STRIKE',
			DEMONSTRATION = 'DEMONSTRATION',
			ACCIDENT = 'ACCIDENT',
			HOLIDAY = 'HOLIDAY',
			WEATHER = 'WEATHER',
			MAINTENANCE = 'MAINTENANCE',
			CONSTRUCTION = 'CONSTRUCTION',
			POLICE_ACTIVITY = 'POLICE_ACTIVITY',
			MEDICAL_EMERGENCY = 'MEDICAL_EMERGENCY'
		}

		enum __CauseValues {
			PROTO3_DEFAULT_CAUSE = 0,
			UNKNOWN_CAUSE = 1,
			OTHER_CAUSE = 2,
			TECHNICAL_PROBLEM = 3,
			STRIKE = 4,
			DEMONSTRATION = 5,
			ACCIDENT = 6,
			HOLIDAY = 7,
			WEATHER = 8,
			MAINTENANCE = 9,
			CONSTRUCTION = 10,
			POLICE_ACTIVITY = 11,
			MEDICAL_EMERGENCY = 12
		}

		export namespace Cause {
			export const codec = (): Codec<Cause> => {
				return enumeration<Cause>(__CauseValues)
			}
		}

		export enum Effect {
			PROTO3_DEFAULT_EFFECT = 'PROTO3_DEFAULT_EFFECT',
			NO_SERVICE = 'NO_SERVICE',
			REDUCED_SERVICE = 'REDUCED_SERVICE',
			SIGNIFICANT_DELAYS = 'SIGNIFICANT_DELAYS',
			DETOUR = 'DETOUR',
			ADDITIONAL_SERVICE = 'ADDITIONAL_SERVICE',
			MODIFIED_SERVICE = 'MODIFIED_SERVICE',
			OTHER_EFFECT = 'OTHER_EFFECT',
			UNKNOWN_EFFECT = 'UNKNOWN_EFFECT',
			STOP_MOVED = 'STOP_MOVED'
		}

		enum __EffectValues {
			PROTO3_DEFAULT_EFFECT = 0,
			NO_SERVICE = 1,
			REDUCED_SERVICE = 2,
			SIGNIFICANT_DELAYS = 3,
			DETOUR = 4,
			ADDITIONAL_SERVICE = 5,
			MODIFIED_SERVICE = 6,
			OTHER_EFFECT = 7,
			UNKNOWN_EFFECT = 8,
			STOP_MOVED = 9
		}

		export namespace Effect {
			export const codec = (): Codec<Effect> => {
				return enumeration<Effect>(__EffectValues)
			}
		}

		let _codec: Codec<Alert>

		export const codec = (): Codec<Alert> => {
			if (_codec == null) {
				_codec = message<Alert>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if (obj.activePeriod != null) {
						for (const value of obj.activePeriod) {
							w.uint32(10)
							transit_realtime.TimeRange.codec().encode(value, w)
						}
					}

					if (obj.informedEntity != null) {
						for (const value of obj.informedEntity) {
							w.uint32(42)
							transit_realtime.EntitySelector.codec().encode(value, w)
						}
					}

					if (obj.cause != null && __CauseValues[obj.cause] !== 0) {
						w.uint32(48)
						transit_realtime.Alert.Cause.codec().encode(obj.cause, w)
					}

					if (obj.effect != null && __EffectValues[obj.effect] !== 0) {
						w.uint32(56)
						transit_realtime.Alert.Effect.codec().encode(obj.effect, w)
					}

					if (obj.url != null) {
						w.uint32(66)
						transit_realtime.TranslatedString.codec().encode(obj.url, w)
					}

					if (obj.headerText != null) {
						w.uint32(82)
						transit_realtime.TranslatedString.codec().encode(obj.headerText, w)
					}

					if (obj.descriptionText != null) {
						w.uint32(90)
						transit_realtime.TranslatedString.codec().encode(obj.descriptionText, w)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						activePeriod: [],
						informedEntity: [],
						cause: Cause.PROTO3_DEFAULT_CAUSE,
						effect: Effect.PROTO3_DEFAULT_EFFECT
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.activePeriod.push(transit_realtime.TimeRange.codec().decode(reader, reader.uint32()))
								break
							case 5:
								obj.informedEntity.push(transit_realtime.EntitySelector.codec().decode(reader, reader.uint32()))
								break
							case 6:
								obj.cause = transit_realtime.Alert.Cause.codec().decode(reader)
								break
							case 7:
								obj.effect = transit_realtime.Alert.Effect.codec().decode(reader)
								break
							case 8:
								obj.url = transit_realtime.TranslatedString.codec().decode(reader, reader.uint32())
								break
							case 10:
								obj.headerText = transit_realtime.TranslatedString.codec().decode(reader, reader.uint32())
								break
							case 11:
								obj.descriptionText = transit_realtime.TranslatedString.codec().decode(reader, reader.uint32())
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<Alert>): Uint8Array => {
			return encodeMessage(obj, Alert.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): Alert => {
			return decodeMessage(buf, Alert.codec())
		}
	}

	export interface TimeRange {
		start: bigint
		end: bigint
	}

	export namespace TimeRange {
		let _codec: Codec<TimeRange>

		export const codec = (): Codec<TimeRange> => {
			if (_codec == null) {
				_codec = message<TimeRange>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if ((obj.start != null && obj.start !== 0n)) {
						w.uint32(8)
						w.uint64(obj.start)
					}

					if ((obj.end != null && obj.end !== 0n)) {
						w.uint32(16)
						w.uint64(obj.end)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						start: 0n,
						end: 0n
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.start = reader.uint64()
								break
							case 2:
								obj.end = reader.uint64()
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<TimeRange>): Uint8Array => {
			return encodeMessage(obj, TimeRange.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): TimeRange => {
			return decodeMessage(buf, TimeRange.codec())
		}
	}

	export interface Position {
		latitude: number
		longitude: number
		bearing: number
		odometer: number
		speed: number
	}

	export namespace Position {
		let _codec: Codec<Position>

		export const codec = (): Codec<Position> => {
			if (_codec == null) {
				_codec = message<Position>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if ((obj.latitude != null && obj.latitude !== 0)) {
						w.uint32(13)
						w.float(obj.latitude)
					}

					if ((obj.longitude != null && obj.longitude !== 0)) {
						w.uint32(21)
						w.float(obj.longitude)
					}

					if ((obj.bearing != null && obj.bearing !== 0)) {
						w.uint32(29)
						w.float(obj.bearing)
					}

					if ((obj.odometer != null && obj.odometer !== 0)) {
						w.uint32(33)
						w.double(obj.odometer)
					}

					if ((obj.speed != null && obj.speed !== 0)) {
						w.uint32(45)
						w.float(obj.speed)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						latitude: 0,
						longitude: 0,
						bearing: 0,
						odometer: 0,
						speed: 0
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.latitude = reader.float()
								break
							case 2:
								obj.longitude = reader.float()
								break
							case 3:
								obj.bearing = reader.float()
								break
							case 4:
								obj.odometer = reader.double()
								break
							case 5:
								obj.speed = reader.float()
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<Position>): Uint8Array => {
			return encodeMessage(obj, Position.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): Position => {
			return decodeMessage(buf, Position.codec())
		}
	}

	export interface TripDescriptor {
		tripId: string
		routeId: string
		directionId: number
		startTime: string
		startDate: string
		scheduleRelationship: transit_realtime.TripDescriptor.ScheduleRelationship
	}

	export namespace TripDescriptor {
		export enum ScheduleRelationship {
			SCHEDULED = 'SCHEDULED',
			ADDED = 'ADDED',
			UNSCHEDULED = 'UNSCHEDULED',
			CANCELED = 'CANCELED'
		}

		enum __ScheduleRelationshipValues {
			SCHEDULED = 0,
			ADDED = 1,
			UNSCHEDULED = 2,
			CANCELED = 3
		}

		export namespace ScheduleRelationship {
			export const codec = (): Codec<ScheduleRelationship> => {
				return enumeration<ScheduleRelationship>(__ScheduleRelationshipValues)
			}
		}

		let _codec: Codec<TripDescriptor>

		export const codec = (): Codec<TripDescriptor> => {
			if (_codec == null) {
				_codec = message<TripDescriptor>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if ((obj.tripId != null && obj.tripId !== '')) {
						w.uint32(10)
						w.string(obj.tripId)
					}

					if ((obj.routeId != null && obj.routeId !== '')) {
						w.uint32(42)
						w.string(obj.routeId)
					}

					if ((obj.directionId != null && obj.directionId !== 0)) {
						w.uint32(48)
						w.uint32(obj.directionId)
					}

					if ((obj.startTime != null && obj.startTime !== '')) {
						w.uint32(18)
						w.string(obj.startTime)
					}

					if ((obj.startDate != null && obj.startDate !== '')) {
						w.uint32(26)
						w.string(obj.startDate)
					}

					if (obj.scheduleRelationship != null && __ScheduleRelationshipValues[obj.scheduleRelationship] !== 0) {
						w.uint32(32)
						transit_realtime.TripDescriptor.ScheduleRelationship.codec().encode(obj.scheduleRelationship, w)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						tripId: '',
						routeId: '',
						directionId: 0,
						startTime: '',
						startDate: '',
						scheduleRelationship: ScheduleRelationship.SCHEDULED
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.tripId = reader.string()
								break
							case 5:
								obj.routeId = reader.string()
								break
							case 6:
								obj.directionId = reader.uint32()
								break
							case 2:
								obj.startTime = reader.string()
								break
							case 3:
								obj.startDate = reader.string()
								break
							case 4:
								obj.scheduleRelationship = transit_realtime.TripDescriptor.ScheduleRelationship.codec().decode(reader)
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<TripDescriptor>): Uint8Array => {
			return encodeMessage(obj, TripDescriptor.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): TripDescriptor => {
			return decodeMessage(buf, TripDescriptor.codec())
		}
	}

	export interface VehicleDescriptor {
		id: string
		label: string
		licensePlate: string
	}

	export namespace VehicleDescriptor {
		let _codec: Codec<VehicleDescriptor>

		export const codec = (): Codec<VehicleDescriptor> => {
			if (_codec == null) {
				_codec = message<VehicleDescriptor>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if ((obj.id != null && obj.id !== '')) {
						w.uint32(10)
						w.string(obj.id)
					}

					if ((obj.label != null && obj.label !== '')) {
						w.uint32(18)
						w.string(obj.label)
					}

					if ((obj.licensePlate != null && obj.licensePlate !== '')) {
						w.uint32(26)
						w.string(obj.licensePlate)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						id: '',
						label: '',
						licensePlate: ''
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.id = reader.string()
								break
							case 2:
								obj.label = reader.string()
								break
							case 3:
								obj.licensePlate = reader.string()
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<VehicleDescriptor>): Uint8Array => {
			return encodeMessage(obj, VehicleDescriptor.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): VehicleDescriptor => {
			return decodeMessage(buf, VehicleDescriptor.codec())
		}
	}

	export interface EntitySelector {
		agencyId: string
		routeId: string
		routeType: number
		trip?: transit_realtime.TripDescriptor
		stopId: string
	}

	export namespace EntitySelector {
		let _codec: Codec<EntitySelector>

		export const codec = (): Codec<EntitySelector> => {
			if (_codec == null) {
				_codec = message<EntitySelector>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if ((obj.agencyId != null && obj.agencyId !== '')) {
						w.uint32(10)
						w.string(obj.agencyId)
					}

					if ((obj.routeId != null && obj.routeId !== '')) {
						w.uint32(18)
						w.string(obj.routeId)
					}

					if ((obj.routeType != null && obj.routeType !== 0)) {
						w.uint32(24)
						w.int32(obj.routeType)
					}

					if (obj.trip != null) {
						w.uint32(34)
						transit_realtime.TripDescriptor.codec().encode(obj.trip, w)
					}

					if ((obj.stopId != null && obj.stopId !== '')) {
						w.uint32(42)
						w.string(obj.stopId)
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						agencyId: '',
						routeId: '',
						routeType: 0,
						stopId: ''
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.agencyId = reader.string()
								break
							case 2:
								obj.routeId = reader.string()
								break
							case 3:
								obj.routeType = reader.int32()
								break
							case 4:
								obj.trip = transit_realtime.TripDescriptor.codec().decode(reader, reader.uint32())
								break
							case 5:
								obj.stopId = reader.string()
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<EntitySelector>): Uint8Array => {
			return encodeMessage(obj, EntitySelector.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): EntitySelector => {
			return decodeMessage(buf, EntitySelector.codec())
		}
	}

	export interface TranslatedString {
		translation: transit_realtime.TranslatedString.Translation[]
	}

	export namespace TranslatedString {
		export interface Translation {
			text: string
			language: string
		}

		export namespace Translation {
			let _codec: Codec<Translation>

			export const codec = (): Codec<Translation> => {
				if (_codec == null) {
					_codec = message<Translation>((obj, w, opts = {}) => {
						if (opts.lengthDelimited !== false) {
							w.fork()
						}

						if ((obj.text != null && obj.text !== '')) {
							w.uint32(10)
							w.string(obj.text)
						}

						if ((obj.language != null && obj.language !== '')) {
							w.uint32(18)
							w.string(obj.language)
						}

						if (opts.lengthDelimited !== false) {
							w.ldelim()
						}
					}, (reader, length) => {
						const obj: any = {
							text: '',
							language: ''
						}

						const end = length == null ? reader.len : reader.pos + length

						while (reader.pos < end) {
							const tag = reader.uint32()

							switch (tag >>> 3) {
								case 1:
									obj.text = reader.string()
									break
								case 2:
									obj.language = reader.string()
									break
								default:
									reader.skipType(tag & 7)
									break
							}
						}

						return obj
					})
				}

				return _codec
			}

			export const encode = (obj: Partial<Translation>): Uint8Array => {
				return encodeMessage(obj, Translation.codec())
			}

			export const decode = (buf: Uint8Array | Uint8ArrayList): Translation => {
				return decodeMessage(buf, Translation.codec())
			}
		}

		let _codec: Codec<TranslatedString>

		export const codec = (): Codec<TranslatedString> => {
			if (_codec == null) {
				_codec = message<TranslatedString>((obj, w, opts = {}) => {
					if (opts.lengthDelimited !== false) {
						w.fork()
					}

					if (obj.translation != null) {
						for (const value of obj.translation) {
							w.uint32(10)
							transit_realtime.TranslatedString.Translation.codec().encode(value, w)
						}
					}

					if (opts.lengthDelimited !== false) {
						w.ldelim()
					}
				}, (reader, length) => {
					const obj: any = {
						translation: []
					}

					const end = length == null ? reader.len : reader.pos + length

					while (reader.pos < end) {
						const tag = reader.uint32()

						switch (tag >>> 3) {
							case 1:
								obj.translation.push(transit_realtime.TranslatedString.Translation.codec().decode(reader, reader.uint32()))
								break
							default:
								reader.skipType(tag & 7)
								break
						}
					}

					return obj
				})
			}

			return _codec
		}

		export const encode = (obj: Partial<TranslatedString>): Uint8Array => {
			return encodeMessage(obj, TranslatedString.codec())
		}

		export const decode = (buf: Uint8Array | Uint8ArrayList): TranslatedString => {
			return decodeMessage(buf, TranslatedString.codec())
		}
	}

	let _codec: Codec<transit_realtime>

	export const codec = (): Codec<transit_realtime> => {
		if (_codec == null) {
			_codec = message<transit_realtime>((obj, w, opts = {}) => {
				if (opts.lengthDelimited !== false) {
					w.fork()
				}

				if (opts.lengthDelimited !== false) {
					w.ldelim()
				}
			}, (reader, length) => {
				const obj: any = {}

				const end = length == null ? reader.len : reader.pos + length

				while (reader.pos < end) {
					const tag = reader.uint32()

					switch (tag >>> 3) {
						default:
							reader.skipType(tag & 7)
							break
					}
				}

				return obj
			})
		}

		return _codec
	}

	export const encode = (obj: Partial<transit_realtime>): Uint8Array => {
		return encodeMessage(obj, transit_realtime.codec())
	}

	export const decode = (buf: Uint8Array | Uint8ArrayList): transit_realtime => {
		return decodeMessage(buf, transit_realtime.codec())
	}
}
