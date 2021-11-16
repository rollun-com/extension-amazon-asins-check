import { HttpRequestMethods, useLazyQuery } from 'common/hooks';

enum Decisions {
  Yes = '1',
  No = '0',
  Empty = 'empty',
}

enum Operators {
  Manager = 'manager',
  Auto = 'auto',
}
type DecisionStrategyPayload = {
  id: string;
  rid: string;
  decision: Decisions;
};

const useSelectDecision = () => {
  const [res, fetchByUrl] = useLazyQuery();

  const handleDecision = (payload: DecisionStrategyPayload) => {
    return fetchByUrl('https://rollun.net/api/datastore/AmazonMsinRidCheck', {
      method: HttpRequestMethods.Put,
      body: { ...payload, operator: Operators.Manager },
    });
  };

  const handleYes = (id: string, rid: string) => {
    return handleDecision({
      id,
      rid,
      decision: Decisions.Yes,
    });
  };
  const handleNo = (id: string, rid: string) => {
    return handleDecision({
      id,
      rid,
      decision: Decisions.No,
    });
  };
  const handleEmpty = (id: string, rid: string) => {
    return handleDecision({
      id,
      rid,
      decision: Decisions.Empty,
    });
  };

  return { ...res, handlers: { handleYes, handleNo, handleEmpty } };
};

export { useSelectDecision };
