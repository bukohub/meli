import './battle.scss';
import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from 'app/config/store';

import { getEntities } from './monster.reducer';
import Loading from 'app/shared/layout/loading/loading';
import { Monster as IMonster, Monster } from 'app/shared/model/Monster.model';
import { getStartBattle } from './battle.reducer';

export const Battle = () => {
  const dispatch = useAppDispatch();

  const [monsterA, setMonsterA] = useState(new Monster());
  const [monsterB, setMonsterB] = useState(new Monster());
  const [battleInit, setBattleInit] = useState(false);

  const monsterList = useAppSelector(state => state.monster.entities);
  const battleStart = useAppSelector(state => state.battle.entities);

  const loading = useAppSelector(state => state.monster.loading);

  const chooseMonster = (monster: IMonster) => {
    if (!monsterA.id) {
      setMonsterA(monster);
      return;
    }

    if (monsterA.id == monster.id) {
      setMonsterA(new Monster());
      return;
    }

    if (monsterB.id == monster.id) {
      setMonsterB(new Monster());
      return;
    }

    if (monsterB.id == monsterA.id) {
      setMonsterA(new Monster());
      setMonsterB(new Monster());
      return;
    }

    setMonsterB(monster);
  };

  const startBattle = () => {
    setBattleInit(true);

    dispatch(getStartBattle([monsterA, monsterB]));
  };

  const iAmFirstAttacker = (monster: Monster) => {
    return monster.id == battleStart.firstAttacker?.id;
  };

  const iAmWinner = (monster: Monster) => {
    return monster.id == battleStart.winner?.id;
  };

  useEffect(() => {
    dispatch(getEntities());
  }, []);

  useEffect(() => {
    const firstAttacker = battleStart.firstAttacker;
  }, [battleStart]);

  return (
    <div className="battle">
      {loading && <Loading></Loading>}

      <div className="battle--title">Battle of Monsters</div>

      <div className="battle--description text-center mt-5">
        <h3>Choose two dangerous monsters to face each other in an intense battle.</h3>
      </div>

      <div className="battle__content mt-5">
        {monsterList?.map((monster: IMonster) => (
          <div key={monster.id} className="monster" onClick={() => chooseMonster(monster)}>
            <img src={monster.imageUrl} />

            <div className="monster--title">
              <div className="monter--title--name">{monster.name}</div>
            </div>
            {monsterA.id === monster.id && <div className="selection-player">Player 1</div>}
            {monsterB.id === monster.id && <div className="selection-player">Player 2</div>}
          </div>
        ))}
      </div>

      <div className="battle--started" style={battleInit ? { top: '0' } : {}}>
        <div className="battle__content mt-5">
          <div className="monster-battle position-relative">
            {iAmFirstAttacker(monsterA) && <div className="battle--first-attacker">I have more speed. I'm first</div>}

            <div
              key={monsterA.id}
              className={iAmFirstAttacker(monsterA) ? 'monster move-right ' : 'monster move-right second-attacker'}
              onClick={() => chooseMonster(monsterA)}
            >
              <img src={monsterA.imageUrl} />
              <div className="monster--title">
                <div className="monter--title--name">{monsterA.name}</div>
              </div>
            </div>
          </div>

          {battleInit && <div className="VS">VS</div>}

          <div className="monster-battle position-relative">
            {iAmFirstAttacker(monsterB) && <div className="battle--first-attacker">I have more speed. I'm first</div>}

            <div
              key={monsterB.id}
              className={iAmFirstAttacker(monsterB) ? 'monster move-left ' : 'monster move-left second-attacker'}
              onClick={() => chooseMonster(monsterB)}
            >
              <img src={monsterB.imageUrl} />

              <div className="monster--title">
                <div className="monter--title--name">{monsterB.name}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {monsterA.id && monsterB.id && (
        <div className="battle__init text-center mt-5 pt-4">
          <button onClick={startBattle}>Click here to Battle</button>
        </div>
      )}
    </div>
  );
};

export default Battle;
