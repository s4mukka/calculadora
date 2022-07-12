import './styles.css'

type DisplayType = {
  value: string;
  loading: boolean;
  error: boolean;
}

const Display = ({ value, loading, error }: DisplayType) => {
  return (
    <div className="display-wrap" data-testid="display">
      {error ? 'ERR' : (loading ? '...' : (value || '0'))}
    </div>
  )
}

export { Display }
