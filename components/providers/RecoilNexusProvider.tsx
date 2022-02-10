import { RecoilValue, RecoilState, useRecoilCallback } from 'recoil'
import { MyRecoilNexus } from '../../@types/providers'

const nexus: MyRecoilNexus = {}

export default function RecoilNexusProvider() {
  nexus.get = useRecoilCallback(({ snapshot }) => ((atom) => snapshot.getLoadable(atom).contents), [])

  nexus.getPromise = useRecoilCallback(({ snapshot }) => ((atom) => snapshot.getPromise(atom)), [])

  nexus.set = useRecoilCallback(({ set }) => set, [])

  nexus.reset = useRecoilCallback(({ reset }) => reset, [])

  return null
}

export function getRecoil<T>(atom: RecoilValue<T>): T {
  return nexus.get!(atom)
}

export function getRecoilPromise<T>(atom: RecoilValue<T>): Promise<T> {
  return nexus.getPromise!(atom)
}

export function setRecoil<T>(atom: RecoilState<T>, valOrUpdater: T | ((currVal: T) => T)) {
  nexus.set!(atom, valOrUpdater)
}

export function resetRecoil(atom: RecoilState<any>) {
  nexus.reset!(atom)
}