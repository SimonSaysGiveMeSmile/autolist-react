import type { CarDetails } from "../lib/types";
import type { Dict } from "../lib/i18n";

interface Props {
  car: CarDetails;
  dict: Dict;
  errors: Partial<Record<keyof CarDetails, boolean>>;
  onChange: (patch: Partial<CarDetails>) => void;
}

export default function CarForm({ car, dict, errors, onChange }: Props) {
  const set =
    (key: keyof CarDetails) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
      >
    ) =>
      onChange({ [key]: e.target.value } as Partial<CarDetails>);

  return (
    <div className="glass-card">
      <h2>{dict.carDetails}</h2>
      <p className="subtle">{dict.carDetailsSub}</p>

      <div className="row">
        <div className="field">
          <label>
            {dict.make} <span className="req">*</span>
          </label>
          <input
            className="input"
            value={car.make}
            onChange={set("make")}
            placeholder="Toyota"
            aria-invalid={!!errors.make}
          />
          {errors.make && <div className="field-error">{dict.errRequired}</div>}
        </div>
        <div className="field">
          <label>
            {dict.model} <span className="req">*</span>
          </label>
          <input
            className="input"
            value={car.model}
            onChange={set("model")}
            placeholder="Corolla"
            aria-invalid={!!errors.model}
          />
          {errors.model && (
            <div className="field-error">{dict.errRequired}</div>
          )}
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>{dict.year}</label>
          <input
            className="input"
            value={car.year}
            onChange={set("year")}
            inputMode="numeric"
            placeholder="2018"
          />
        </div>
        <div className="field">
          <label>{dict.color}</label>
          <input
            className="input"
            value={car.color}
            onChange={set("color")}
            placeholder="Silver"
          />
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>{dict.price}</label>
          <input
            className="input"
            value={car.price}
            onChange={set("price")}
            inputMode="numeric"
            placeholder="14500"
          />
        </div>
        <div className="field">
          <label>{dict.currency}</label>
          <select
            className="select"
            value={car.currency}
            onChange={set("currency")}
          >
            <option value="USD">USD $</option>
            <option value="CAD">CAD $</option>
            <option value="EUR">EUR €</option>
            <option value="CNY">CNY ¥</option>
            <option value="GBP">GBP £</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>{dict.mileage}</label>
          <input
            className="input"
            value={car.mileage}
            onChange={set("mileage")}
            inputMode="numeric"
            placeholder="86000"
          />
        </div>
        <div className="field">
          <label>&nbsp;</label>
          <select
            className="select"
            value={car.mileageUnit}
            onChange={set("mileageUnit")}
          >
            <option value="km">km</option>
            <option value="mi">mi</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>{dict.transmission}</label>
          <select
            className="select"
            value={car.transmission}
            onChange={set("transmission")}
          >
            <option value="">{dict.selectPlaceholder}</option>
            <option value="automatic">{dict.automatic}</option>
            <option value="manual">{dict.manual}</option>
          </select>
        </div>
        <div className="field">
          <label>{dict.fuel}</label>
          <select className="select" value={car.fuel} onChange={set("fuel")}>
            <option value="">{dict.selectPlaceholder}</option>
            <option value="gas">{dict.gas}</option>
            <option value="diesel">{dict.diesel}</option>
            <option value="hybrid">{dict.hybrid}</option>
            <option value="electric">{dict.electric}</option>
          </select>
        </div>
      </div>

      <div className="row">
        <div className="field">
          <label>{dict.condition}</label>
          <select
            className="select"
            value={car.condition}
            onChange={set("condition")}
          >
            <option value="">{dict.selectPlaceholder}</option>
            <option value="excellent">{dict.excellent}</option>
            <option value="good">{dict.good}</option>
            <option value="fair">{dict.fair}</option>
          </select>
        </div>
        <div className="field">
          <label>
            {dict.vin} <span className="subtle">({dict.optional})</span>
          </label>
          <input
            className="input"
            value={car.vin}
            onChange={set("vin")}
            placeholder="1HGBH41JXMN..."
          />
        </div>
      </div>

      <div className="field">
        <label>{dict.location}</label>
        <input
          className="input"
          value={car.location}
          onChange={set("location")}
          placeholder="Toronto, ON"
        />
      </div>

      <div className="row">
        <div className="field">
          <label>{dict.sellerName}</label>
          <input
            className="input"
            value={car.sellerName}
            onChange={set("sellerName")}
          />
        </div>
        <div className="field">
          <label>{dict.contact}</label>
          <input
            className="input"
            value={car.contact}
            onChange={set("contact")}
            placeholder="(416) 555-0190"
          />
        </div>
      </div>

      <div className="field">
        <label>
          {dict.notes} <span className="subtle">({dict.optional})</span>
        </label>
        <textarea
          className="textarea"
          value={car.notes}
          onChange={set("notes")}
          placeholder={dict.notesPlaceholder}
        />
      </div>
    </div>
  );
}
