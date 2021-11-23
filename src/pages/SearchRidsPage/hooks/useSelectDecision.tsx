import { HttpRequestMethods, useLazyQuery } from 'common/hooks';

enum Decisions {
  Yes = 'yes',
  No = 'no',
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

  const handleDecision = async (payload: DecisionStrategyPayload) => {
    const result = await fetchByUrl(
      'https://rollun.net/api/datastore/AmazonMsinRidCheck',
      {
        method: HttpRequestMethods.Put,
        body: { ...payload, operator: Operators.Manager },
      },
    );

    if (result !== null) {
      alert(
        `Item with rid ${payload.rid} has been processed, yu can move to next one`,
      );
    }
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
